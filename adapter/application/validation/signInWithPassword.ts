import { AuthRepositoryAPI } from "@/adapter/infrastructure/auth/AuthRepositoryApi";
import { UserEmail } from "@/domain/user/value-objects/UserEmail";
import { UserPassword } from "@/domain/user/value-objects/UserPassword";
import { LogicError } from "@/utilities/error/LogicError";
import { Result } from "@/utilities/error/Result";
import { zodEmail } from "./zodPreset";

export function isEmailValid(email: string) {
  const result = zodEmail().safeParse(email);
  return new Result<boolean, string>(
    result.success,
    result.success
      ? null
      : new LogicError<string>("Invalid email format", "VALIDATION" as const),
  );
}

export async function signInWithPassword(form: {
  email: string;
  password: string;
}) {
  const emaiAndPassword = {
    email: new UserEmail(form.email).stripOverflowLength(),
    password: new UserPassword(form.password).stripOverflowLength(),
  };

  const authRepository = new AuthRepositoryAPI();

  const signInResult =
    await authRepository.signInWithEmailAndPassword(emaiAndPassword);

  if (!signInResult) {
    return new Result(
      null,
      new LogicError("Failed to sign in", "AUTHENTICATION"),
    );
  }
}
