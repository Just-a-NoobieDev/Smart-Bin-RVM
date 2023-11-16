"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase-browser";
import { useAuthStore } from "@/store/Auth";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const login = useAuthStore((state) => state.login);
  const [initial, setInitial] = useState(true);
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [event, setEvent] = useState("");
  const router = useRouter();
  const { accessToken, ...rest } = props;

  useEffect(() => {
    async function getActiveSession() {
      const {
        data: { session: activeSession },
      } = await supabase.auth.getSession();
      setSession(activeSession);
      login(activeSession?.user ?? null);
      setUser(activeSession?.user ?? null);
      setInitial(false);
    }
    getActiveSession();

    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange((event, currentSession) => {
      if (currentSession?.access_token !== accessToken) {
        router.refresh();
      }

      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      setEvent(event);

      if (event == "SIGNED_OUT") {
        router.push("/login");
      }
    });

    return () => {
      authListener?.unsubscribe();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(() => {
    return {
      initial,
      session,
      user,
      event,
      signOut: () => supabase.auth.signOut(),
    };
  }, [initial, session, user, event]);

  return <AuthContext.Provider value={value} {...rest} />;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
