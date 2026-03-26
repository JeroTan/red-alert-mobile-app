import { Session } from "../entity/Session";

export interface SessionRepository {
  storeSession(session: Session): Promise<void>;
  clearSession(): Promise<void>;
  hasSession(): Promise<boolean>;
  getSession(): Promise<Session>;
}
