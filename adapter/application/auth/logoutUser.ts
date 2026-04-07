import { AuthRepositoryApi } from "@/adapter/infrastructure/auth/AuthRepositoryApi";
import { SessionRepositoryApi } from "@/adapter/infrastructure/auth/SessionRepositoryApi";

export async function logoutUser() {
  const sessionRepo = new SessionRepositoryApi();
  const authRepo = new AuthRepositoryApi();
  const session = await sessionRepo.getSession();
  await sessionRepo.clearSession();
  await authRepo.logout({ refresh_token: session.refresh_token });
}
