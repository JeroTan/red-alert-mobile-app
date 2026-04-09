import { hasSession, sessionInfo } from "@/adapter/application/auth/session";
import { Session } from "@/domain/auth/entity/Session";
import { createContext, useContext, useEffect, useState } from "react";

export type AuthContextType = {
  isLoggedIn: boolean;
  sessionData?: Session | null;
  canBeAResponder?: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
};

export const AuthContext = createContext<AuthContextType>(null!);

export default function AuthContextProvider({
  isLoginInitialState = false,
  initialSessionData = null,
  children,
}: {
  isLoginInitialState?: boolean;
  initialSessionData?: Session | null;
  children?: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(isLoginInitialState);
  const [sessionData, setSessionData] = useState<null | Session>(
    initialSessionData,
  );
  const [canBeAResponder, setCanBeAResponder] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const sessionExists = await hasSession();
      setIsLoggedIn(sessionExists);
      if (sessionExists) {
        const session = await sessionInfo();
        setSessionData(session);
        if (session.user.roles.length > 0) {
          setCanBeAResponder(true);
        }
      }
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, sessionData, canBeAResponder, setIsLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider",
    );
  }
  return context;
}
