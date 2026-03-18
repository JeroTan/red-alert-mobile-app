export class RoleName {
  constructor(public value: UserRoleType) {}
}

const USER_ROLES = [
  "CITIZEN",
  "DISPATCHER",
  "FIRST_AIDER",
  "RESPONDER",
  "ORGANIZATION",
  "ADMIN",
] as const;

type UserRoleType = (typeof USER_ROLES)[number];
