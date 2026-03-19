import { RoleLite } from "@/domain/role/entity/Role";
import { UserEmail } from "@/domain/user/value-objects/UserEmail";
import { UserFirstName } from "@/domain/user/value-objects/UserFirstName";
import { UserId } from "@/domain/user/value-objects/UserId";
import { UserLastName } from "@/domain/user/value-objects/UserLastName";
import { SessionAccessToken } from "../value-objects/SessionAccessToken";
import { SessionExpiresIn } from "../value-objects/SessionExpiresIn";
import { SessionId } from "../value-objects/SessionId";
import { SessionRefreshToken } from "../value-objects/SessionRefreshToken";

export class Session {
  constructor(
    public id: SessionId,
    public access_token: SessionAccessToken,
    public refresh_token: SessionRefreshToken,
    public expires_in: SessionExpiresIn,
    public user: [
      id: UserId,
      email: UserEmail,
      first_name: UserFirstName,
      last_name: UserLastName,
      roles: RoleLite[],
    ],
  ) {}
}
