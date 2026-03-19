export const ORGANIZATION_LEVEL = [
  "NATIONAL",
  "REGIONAL",
  "PROVINCIAL",
  "CITY",
  "MUNICIPAL",
  "BARANGAY",
] as const;

export type OrganizationLevelType = (typeof ORGANIZATION_LEVEL)[number];

export class OrganizationLevel {
  constructor(public value: OrganizationLevelType) {}
}
