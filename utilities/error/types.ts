export const LOGIC_ERROR_CODE = [
  "NOT_FOUND",
  "UNKNOWN",
  "VALIDATION",
  "AUTHENTICATION",
] as const;

export type LogicErrorCodeType = (typeof LOGIC_ERROR_CODE)[number];
