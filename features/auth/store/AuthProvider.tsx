import { AuthRepositoryAPI } from "@/adapter/infrastructure/auth/AuthRepositoryApi";
import { SessionRepositoryApi } from "@/adapter/infrastructure/auth/SessionRepositoryApi";
import { createContext, useContext, useEffect, useRef, useState } from "react";

export type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
};

export const AuthContext = createContext<AuthContextType>(null!);

export default function AuthContextProvider({
  isLoginInitialState = false,
  children,
}: {
  isLoginInitialState?: boolean;
  children?: React.ReactNode;
}) {
  const authRepo = useRef(new AuthRepositoryAPI());
  const sessionRepo = useRef(new SessionRepositoryApi());

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(isLoginInitialState);

  useEffect(() => {
    (async () => {
      const hasSession = await sessionRepo.current.hasSession();
      setIsLoggedIn(hasSession);
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
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
