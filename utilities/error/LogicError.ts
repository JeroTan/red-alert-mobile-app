import uuid from "react-native-uuid";
import { LogicErrorCodeType } from "./types";
export class LogicError<T> {
  constructor(
    public data: T,
    public code: LogicErrorCodeType,
    public id = uuid.v4(),
  ) {}
}
