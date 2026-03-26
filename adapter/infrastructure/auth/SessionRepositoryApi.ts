import { Session } from "@/domain/auth/entity/Session";
import { SessionRepository } from "@/domain/auth/repository/SessionRepository";
import { SessionAccessToken } from "@/domain/auth/value-objects/SessionAccessToken";
import { SessionExpiresIn } from "@/domain/auth/value-objects/SessionExpiresIn";
import { SessionId } from "@/domain/auth/value-objects/SessionId";
import { SessionRefreshToken } from "@/domain/auth/value-objects/SessionRefreshToken";
import { RoleLite } from "@/domain/role/entity/Role";
import { RoleName } from "@/domain/role/value-objects/RoleName";
import { UserEmail } from "@/domain/user/value-objects/UserEmail";
import { UserFirstName } from "@/domain/user/value-objects/UserFirstName";
import { UserId } from "@/domain/user/value-objects/UserId";
import { UserLastName } from "@/domain/user/value-objects/UserLastName";
import * as SecureStore from "expo-secure-store";

export class SessionRepositoryApi implements SessionRepository {
  async clearSession(): Promise<void> {}
  async hasSession(): Promise<boolean> {
    const session = await SecureStore.getItemAsync("session");
    return !!session;
  }
  async getSession(): Promise<Session> {
    const sessionResult = await SecureStore.getItemAsync("session");
    if (!sessionResult) {
      throw new Error("No session found.");
    }
    const sessionObj = JSON.parse(sessionResult);
    const session = new Session(
      new SessionId(sessionObj.id),
      new SessionAccessToken(sessionObj.access_token),
      new SessionRefreshToken(sessionObj.refresh_token),
      new SessionExpiresIn(new Date(sessionObj.expires_in)),
      {
        id: new UserId(sessionObj.user.id),
        email: new UserEmail(sessionObj.user.email),
        first_name: new UserFirstName(sessionObj.user.first_name),
        last_name: new UserLastName(sessionObj.user.last_name),
        roles: sessionObj.user.roles.map(
          (roleData: { name: RoleLite["name"]["value"] }) => {
            return new RoleLite(new RoleName(roleData.name));
          },
        ),
      },
    );
    return session;
  }
  async storeSession(session: Session): Promise<void> {
    await SecureStore.setItemAsync("session", JSON.stringify(session));
  }
}
