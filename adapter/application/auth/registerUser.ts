import { AuthRepositoryApi } from "@/adapter/infrastructure/auth/AuthRepositoryApi";
import { UserEmail } from "@/domain/user/value-objects/UserEmail";
import { UserFirstName } from "@/domain/user/value-objects/UserFirstName";
import { UserLastName } from "@/domain/user/value-objects/UserLastName";
import { UserPassword } from "@/domain/user/value-objects/UserPassword";
import { UserPhone } from "@/domain/user/value-objects/UserPhone";
import { LogicError } from "@/utilities/error/LogicError";
import { Result } from "@/utilities/error/Result";

export async function registerUser(form: {
  phone: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}) {
  const authRepo = new AuthRepositoryApi();
  try {
    const registrationResult = await authRepo.registerUser({
      phone: new UserPhone(form.phone),
      email: new UserEmail(form.email).stripOverflowLength(),
      password: new UserPassword(form.password).stripOverflowLength(),
      first_name: new UserFirstName(form.first_name),
      last_name: new UserLastName(form.last_name),
      file: null, // For simplicity, we're not handling profile image upload in this function. It can be added later if needed.
    });
    return new Result(registrationResult, null);
  } catch (error) {
    if (error instanceof LogicError) {
      return new Result(null, error);
    } else {
      return new Result(
        null,
        new LogicError(
          "An unexpected error occurred during registration: " +
            JSON.stringify(error),
          "UNKNOWN",
        ),
      );
    }
  }
}
