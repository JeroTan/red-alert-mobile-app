import uuid from "react-native-uuid";
import { LogicErrorCode } from "../value-objects/LogicErrorCode";
export class LogicError<T> {
  constructor(
    public data: T,
    public code: LogicErrorCode,
    public id = uuid.v4(),
  ) {}
}
