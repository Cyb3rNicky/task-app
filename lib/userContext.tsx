import { Session } from "@supabase/supabase-js";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "./supabase";

// definir context para guardar el session y el profile
export interface UserProfile {
  username: string;
}

export interface UserInfo {
  session: Session | null;
  profile: UserProfile | null;
  isLoading: boolean;
}

const UserContext = createContext<UserInfo>({
  session: null,
  profile: null,
  isLoading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    session: null,
    profile: null,
    isLoading: true,
  });

  useEffect(() => {
    const loadSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUserInfo({ session, profile: null, isLoading: false });
    };

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserInfo({ session, profile: null, isLoading: false });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={userInfo}>
      {children}
    </UserContext.Provider>
  );
}


// crear un hook reutilizable que utilice el context
export function useUserInfo() {
  return useContext(UserContext);
}