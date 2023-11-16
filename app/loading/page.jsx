"use client";
import supabase from "@/lib/supabase-browser";
import { useAuthStore } from "@/store/Auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingComponent from "@/components/LoadingComponent";

const Loading = () => {
  const user = useAuthStore((state) => state.user);
  const setRole = useAuthStore((state) => state.setRole);
  const stopLoading = useAuthStore((state) => state.stopLoading);
  const [role, setRoleState] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      return router.push("/login");
    }

    async function getRole() {
      const { data: role, error } = await supabase
        .from("users_role")
        .select("role")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.log(error);
      }

      setRole(role.role);
      setRoleState(role.role);
    }

    if (user) {
      getRole();
    }

    if (role) {
      const interval = setInterval(() => {
        if (role == 1) {
          stopLoading();
          router.push("/dashboard");
        } else {
          stopLoading();
          router.push("/admin");
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [user, router, role, setRole, stopLoading]);

  return <LoadingComponent />;
};

export default Loading;
