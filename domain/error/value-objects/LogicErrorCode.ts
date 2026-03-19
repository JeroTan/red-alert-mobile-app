export const LOGIC_ERROR_CODE = ["NOT_FOUND", "UNKNOWN", "VALIDATION"] as const;

export type LogicErrorCodeType = (typeof LOGIC_ERROR_CODE)[number];

export class LogicErrorCode {
  constructor(public value: LogicErrorCodeType) {}
}
