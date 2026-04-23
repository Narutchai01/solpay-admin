import { useState, useCallback, useEffect } from "react";
import { UserDetail } from "@/types/user";
import { userService } from "@/services/userService";

export const useUser = () => {
  const [users, setUsers] = useState<UserDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setError(null);
    try {
      const data = await userService.getPendingUsers();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load users");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateStatus = async (id_card: string, status: "APPROVED" | "REJECTED") => {
    setIsUpdating(true);
    try {
      await userService.updateUserStatus({ id_card, status });
      await fetchUsers(); 
    } catch (err) {
      console.error("Update Status Error:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, isLoading, isUpdating, error, refresh: fetchUsers, updateStatus };
};