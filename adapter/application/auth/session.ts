import { SessionRepositoryApi } from "@/adapter/infrastructure/auth/SessionRepositoryApi";

export async function hasSession() {
  const sessionRepo = new SessionRepositoryApi();
  return await sessionRepo.hasSession();
}

export async function sessionInfo() {
  const sessionRepo = new SessionRepositoryApi();
  return await sessionRepo.getSession();
}
