"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import routeConfig from "./routeConfig";
import { useAuthStore } from "@/store/Auth";
import supabase from "@/lib/supabase-browser";
import Loading from "@/components/LoadingComponent";
function withAuth(Component, allowedRole) {
  return function WithAuthWrapper(props) {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const role = useAuthStore((state) => state.role);
    const isLoading = useAuthStore((state) => state.isLoading);
    const stopLoading = useAuthStore((state) => state.stopLoading);
    const login = useAuthStore((state) => state.login);
    const setRole = useAuthStore((state) => state.setRole);
    const router = useRouter();
    const path = usePathname();
    const pathName = path.split("/").slice(-1)[0];
    const [isValidRoute, setIsValidRoute] = useState(false);

    useEffect(() => {
      async function getActiveSession() {
        const {
          data: { session: activeSession },
        } = await supabase.auth.getSession();

        if (activeSession == null) {
          router.push("/login");
        } else {
          const { data: role, error } = await supabase
            .from("users_role")
            .select(`role`)
            .eq("user_id", activeSession?.user.id)
            .single();

          if (!error) {
            login(activeSession?.user);
            setRole(role.role);
            stopLoading();
          }
        }
      }

      getActiveSession();

      if (!isLoading) {
        if (isAuthenticated && !allowedRole.includes(role)) {
          setIsValidRoute(false);
          router.push(routeConfig[role].default);
        } else if (!isAuthenticated && !routeConfig.auth[pathName]) {
          setIsValidRoute(false);
          router.push(routeConfig.auth.default);
        } else setIsValidRoute(true);
      }
    }, [
      isAuthenticated,
      isLoading,
      login,
      pathName,
      role,
      router,
      setRole,
      stopLoading,
    ]);

    if (isLoading) return <Loading />;

    return isValidRoute ? <Component {...props} /> : null;
  };
}

export default withAuth;
