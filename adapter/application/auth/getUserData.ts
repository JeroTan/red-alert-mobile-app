import { SessionRepositoryApi } from "@/adapter/infrastructure/auth/SessionRepositoryApi";

export async function getUserData() {
  const sessionRepo = new SessionRepositoryApi();
  const session = await sessionRepo.getSession();
  return session.user;
}
