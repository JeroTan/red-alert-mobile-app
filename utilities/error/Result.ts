import uuid from "react-native-uuid";
import { LogicError } from "./LogicError";
export class Result<T, E> {
  constructor(
    public content: T | null,
    public error: LogicError<E> | null,
    public id = uuid.v4(),
  ) {}
  get() {
    return {
      content: this.content,
      error: this.error,
    } as
      | {
          content: T;
          error: null;
        }
      | {
          content: null;
          error: LogicError<E>;
        };
  }
}
