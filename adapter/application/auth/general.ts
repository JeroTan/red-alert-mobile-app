import { LogicError } from "@/utilities/error/LogicError";
import { Result } from "@/utilities/error/Result";
import { zodEmail } from "../validation/zodPreset";

export function isEmailValid(email: string) {
  const result = zodEmail().safeParse(email);
  return new Result<boolean, string>(
    result.success,
    result.success
      ? null
      : new LogicError<string>("Invalid email format", "VALIDATION" as const),
  );
}
