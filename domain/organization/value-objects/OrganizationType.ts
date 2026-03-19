export const ORGANIZATION_TYPE = [
  "POLICE",
  "AMBULANCE",
  "FIRE",
  "LGU",
  "OCD",
  "COAST_GUARD",
  "BARANGAY",
  "PRIVATE",
] as const;

export type OrganizationTypeType = (typeof ORGANIZATION_TYPE)[number];

export class OrganizationType {
  constructor(public value: OrganizationTypeType) {}
}
