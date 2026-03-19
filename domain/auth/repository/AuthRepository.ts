import { UserEmail } from "@/domain/user/value-objects/UserEmail";
import { UserFirstName } from "@/domain/user/value-objects/UserFirstName";
import { UserLastName } from "@/domain/user/value-objects/UserLastName";
import { UserPassword } from "@/domain/user/value-objects/UserPassword";
import { UserPhone } from "@/domain/user/value-objects/UserPhone";
import { UserProfileImage } from "@/domain/user/value-objects/UserProfileImage";
import { Session } from "../entity/Session";
import { UserAuthRegistrationResponse } from "../entity/UserAuthRegistrationResponse";
import { SessionRefreshToken } from "../value-objects/SessionRefreshToken";

export interface AuthRepository {
  signInWithEmailAndPassword(form: {
    email: UserEmail;
    password: UserPassword;
  }): Promise<Session>;
  registerUser(form: {
    phone: UserPhone;
    email: UserEmail;
    password: UserPassword;
    first_name: UserFirstName;
    last_name: UserLastName;
    file: UserProfileImage | null;
  }): Promise<UserAuthRegistrationResponse>;
  logout(form: { refresh_token: SessionRefreshToken }): Promise<void>;
}
