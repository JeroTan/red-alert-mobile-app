import { LogicError } from "@/domain/error/entity/LogicError";
import { Result } from "@/domain/error/entity/Result";
import { LogicErrorCode } from "@/domain/error/value-objects/LogicErrorCode";
import { zodEmail } from "./zodPreset";

export function isEmailValid(email: string) {
  const result = zodEmail().safeParse(email);
  return new Result<boolean, string>(
    result.success,
    result.success
      ? null
      : new LogicError<string>(
          "Invalid email format",
          new LogicErrorCode("VALIDATION"),
        ),
  );
}
