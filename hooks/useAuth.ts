import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { CreateAdminRequest } from "@/types/auth";
import { authService } from "@/services/authService";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = useCallback(
    async (payload: CreateAdminRequest) => {
      setIsLoading(true);
      setError(null);

      try {
        await authService.login(payload);
        router.replace("/dashboard");
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "An unexpected error occurred";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    },
    [router],
  );

  const handleLogout = useCallback(() => {
    authService.logout();
    router.replace("/login");
  }, [router]);

  return { handleLogin, handleLogout, isLoading, error };
};
