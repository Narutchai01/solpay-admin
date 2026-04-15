import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { CreateAdminRequest } from "@/types/admin";
import { adminService } from "@/services/adminService";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = useCallback(async (payload: CreateAdminRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      await adminService.login(payload);
      router.replace("/dashboard"); 
    } catch (err) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = useCallback(() => {
    adminService.logout();
    router.replace("/login");
  }, [router]);

  return { handleLogin, handleLogout, isLoading, error };
};