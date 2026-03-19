import { EmergencyContact } from "@/domain/emergency-contact/entity/EmergencyContact";
import { OrganizationLite } from "@/domain/organization/entity/OrganizationLite";
import { Role } from "@/domain/role/entity/Role";
import { UserCreatedAt } from "@/domain/user/value-objects/UserCreatedAt";
import { UserEmail } from "@/domain/user/value-objects/UserEmail";
import { UserFirstName } from "@/domain/user/value-objects/UserFirstName";
import { UserId } from "@/domain/user/value-objects/UserId";
import { UserIsActive } from "@/domain/user/value-objects/UserIsActive";
import { UserIsVerified } from "@/domain/user/value-objects/UserIsVerified";
import { UserLastLoginAt } from "@/domain/user/value-objects/UserLastLoginAt";
import { UserLastName } from "@/domain/user/value-objects/UserLastName";
import { UserPhone } from "@/domain/user/value-objects/UserPhone";
import { UserProfileImageUrl } from "@/domain/user/value-objects/UserProfileImageUrl";

export class UserAuthRegistrationResponse {
  constructor(
    public id: UserId,
    public phone: UserPhone,
    public email: UserEmail,
    public first_name: UserFirstName,
    public last_name: UserLastName,
    public roles: Role[],
    public emergency_contacts: EmergencyContact[],
    public organization: OrganizationLite[],
    public is_verified: UserIsVerified,
    public is_active: UserIsActive,
    public profile_image_url?: UserProfileImageUrl,
    public last_login_at?: UserLastLoginAt,
    public created_at?: UserCreatedAt,
  ) {}
}
