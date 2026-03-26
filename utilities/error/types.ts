export const LOGIC_ERROR_CODE = [
  "NOT_FOUND",
  "UNKNOWN",
  "VALIDATION",
  "AUTHENTICATION",
  "BAD_REQUEST",
  "UNAUTHORIZED",
  "FORBIDDEN",
  "INTERNAL_SERVER_ERROR",
] as const;

export type LogicErrorCodeType = (typeof LOGIC_ERROR_CODE)[number];
