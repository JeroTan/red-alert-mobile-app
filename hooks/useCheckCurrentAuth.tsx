import { SessionRepositoryApi } from "@/adapter/infrastructure/auth/SessionRepositoryApi";
import { useEffect, useRef, useState } from "react";

export function useCheckCurrentAuth() {
  const sessionRepo = useRef(new SessionRepositoryApi()).current;
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>();

  useEffect(() => {
    (async () => {
      const isLoggedIn = await sessionRepo.hasSession();
      setIsLoggedIn(true);
    })();
  }, []);

  return isLoggedIn;
}
