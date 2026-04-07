import { hasSession } from "@/adapter/application/auth/hasSession";
import { createContext, useContext, useEffect, useState } from "react";

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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(isLoginInitialState);

  useEffect(() => {
    (async () => {
      setIsLoggedIn(await hasSession());
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
