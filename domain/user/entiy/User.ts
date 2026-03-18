import { EmergencyContact } from "@/domain/emergency-contact/entity/EmergencyContact";
import { Role } from "@/domain/role/entity/Role";
import { UserCreatedAt } from "../value-objects/UserCreatedAt";
import { UserEmail } from "../value-objects/UserEmail";
import { UserFirstName } from "../value-objects/UserFirstName";
import { UserId } from "../value-objects/UserId";
import { UserIsActive } from "../value-objects/UserIsActive";
import { UserIsVerified } from "../value-objects/UserIsVerified";
import { UserLastLoginAt } from "../value-objects/UserLastLoginAt";
import { UserLastName } from "../value-objects/UserLastName";
import { UserPhone } from "../value-objects/UserPhone";
import { UserProfileImageUrl } from "../value-objects/UserProfileImageUrl";
import { UserUpdatedAt } from "../value-objects/UserUpdatedAt";

export class User {
  constructor(
    public id: UserId,
    public phone: UserPhone,
    public email: UserEmail,
    public first_name: UserFirstName,
    public last_name: UserLastName,
    public profile_image_url: UserProfileImageUrl,
    public is_verified: UserIsVerified,
    public is_active: UserIsActive,
    public last_login_at: UserLastLoginAt,
    public created_at: UserCreatedAt,
    public updated_at: UserUpdatedAt,
    public roles: Role[],
    public emergency_contacts: EmergencyContact[],
  ) {}
}
