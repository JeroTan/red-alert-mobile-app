import { Session } from "@/domain/auth/entity/Session";
import { UserAuthRegistrationResponse } from "@/domain/auth/entity/UserAuthRegistrationResponse";
import { AuthRepository } from "@/domain/auth/repository/AuthRepository";
import { SessionAccessToken } from "@/domain/auth/value-objects/SessionAccessToken";
import { SessionExpiresIn } from "@/domain/auth/value-objects/SessionExpiresIn";
import { SessionId } from "@/domain/auth/value-objects/SessionId";
import { SessionRefreshToken } from "@/domain/auth/value-objects/SessionRefreshToken";
import { EmergencyContact } from "@/domain/emergency-contact/entity/EmergencyContact";
import { EmergencyContactCreatedAt } from "@/domain/emergency-contact/value-objects/EmergencyContactCreatedAt";
import { EmergencyContactId } from "@/domain/emergency-contact/value-objects/EmergencyContactId";
import { EmergencyContactName } from "@/domain/emergency-contact/value-objects/EmergencyContactName";
import { EmergencyContactPhone } from "@/domain/emergency-contact/value-objects/EmergencyContactPhone";
import { EmergencyContactRelationship } from "@/domain/emergency-contact/value-objects/EmergencyContactRelationship";
import { LogicError } from "@/domain/error/entity/LogicError";
import { LogicErrorCode } from "@/domain/error/value-objects/LogicErrorCode";
import { OrganizationLite } from "@/domain/organization/entity/OrganizationLite";
import { OrganizationId } from "@/domain/organization/value-objects/OrganizationId";
import {
  OrganizationLevel,
  OrganizationLevelType,
} from "@/domain/organization/value-objects/OrganizationLevel";
import { OrganizationName } from "@/domain/organization/value-objects/OrganizationName";
import { OrganizationShortName } from "@/domain/organization/value-objects/OrganizationShortName";
import {
  OrganizationType,
  OrganizationTypeType,
} from "@/domain/organization/value-objects/OrganizationType";
import { OrganizationAddress } from "@/domain/organization/value-objects/location/OrganizationAddress";
import { OrganizationBarangay } from "@/domain/organization/value-objects/location/OrganizationBarangay";
import { OrganizationCity } from "@/domain/organization/value-objects/location/OrganizationCity";
import { OrganizationProvince } from "@/domain/organization/value-objects/location/OrganizationProvince";
import { OrganizationRegion } from "@/domain/organization/value-objects/location/OrganizationRegion";
import { OrganizationIsActive } from "@/domain/organization/value-objects/status/OrganizationIsActive";
import { OrganizationCreatedAt } from "@/domain/organization/value-objects/timestamp/OrganizationCreatedAt";
import { Role } from "@/domain/role/entity/Role";
import { RoleId } from "@/domain/role/value-objects/RoleId";
import { RoleName, UserRoleType } from "@/domain/role/value-objects/RoleName";
import { UserCreatedAt } from "@/domain/user/value-objects/UserCreatedAt";
import { UserEmail } from "@/domain/user/value-objects/UserEmail";
import { UserFirstName } from "@/domain/user/value-objects/UserFirstName";
import { UserId } from "@/domain/user/value-objects/UserId";
import { UserIsActive } from "@/domain/user/value-objects/UserIsActive";
import { UserIsVerified } from "@/domain/user/value-objects/UserIsVerified";
import { UserLastLoginAt } from "@/domain/user/value-objects/UserLastLoginAt";
import { UserLastName } from "@/domain/user/value-objects/UserLastName";
import { UserPassword } from "@/domain/user/value-objects/UserPassword";
import { UserPhone } from "@/domain/user/value-objects/UserPhone";
import { UserProfileImage } from "@/domain/user/value-objects/UserProfileImage";
import { UserProfileImageUrl } from "@/domain/user/value-objects/UserProfileImageUrl";
import { redAlrertApiAxios } from "@/library/axios";
import uuid from "react-native-uuid";

export class AuthRepositoryAPI implements AuthRepository {
  async signInWithEmailAndPassword(form: {
    email: UserEmail;
    password: UserPassword;
  }) {
    const result = await redAlrertApiAxios.post("/auth/auth/login", {
      email: form.email.value,
      password: form.password.value,
    });
    if (result.status !== 200) {
      throw new LogicError(
        "Failed to sign in" as const,
        new LogicErrorCode("UNKNOWN"),
      );
    }
    return new Session(
      new SessionId(uuid.v4()),
      new SessionAccessToken(result.data.access_token),
      new SessionRefreshToken(result.data.refresh_token),
      new SessionExpiresIn(result.data.expires_in),
      {
        id: new UserId(result.data.user.id),
        email: new UserEmail(result.data.user.email),
        first_name: new UserFirstName(result.data.user.first_name),
        last_name: new UserLastName(result.data.user.last_name),
        roles: result.data.user.roles.map(
          (role: { name: UserRoleType; id: string }) =>
            new Role(new RoleId(role.id), new RoleName(role.name)),
        ),
      },
    );
  }

  async registerUser(form: {
    phone: UserPhone;
    email: UserEmail;
    password: UserPassword;
    first_name: UserFirstName;
    last_name: UserLastName;
    file: UserProfileImage | null;
  }) {
    const formData = new FormData();
    formData.append("phone", form.phone.value);
    formData.append("email", form.email.value);
    formData.append("password", form.password.value);
    formData.append("first_name", form.first_name.value);
    formData.append("last_name", form.last_name.value);
    if (form.file !== null) {
      formData.append("file", form.file.value);
    }

    const result = await redAlrertApiAxios.post("/api/users", formData);

    if (result.status !== 201) {
      throw new LogicError(
        "Failed to register user" as const,
        new LogicErrorCode("UNKNOWN"),
      );
    }

    return new UserAuthRegistrationResponse(
      new UserId(result.data.id),
      new UserPhone(result.data.phone),
      new UserEmail(result.data.email),
      new UserFirstName(result.data.first_name),
      new UserLastName(result.data.last_name),
      result.data.roles.map(
        (role: { name: UserRoleType; id: string }) =>
          new Role(new RoleId(role.id), new RoleName(role.name)),
      ),
      result.data.emergency_contacts.map(
        (contactData: {
          id: string;
          name: string;
          phone: string;
          relationship: string;
          created_at: string;
        }) => {
          return new EmergencyContact(
            new EmergencyContactId(contactData.id),
            new EmergencyContactName(contactData.name),
            new EmergencyContactPhone(contactData.phone),
            new EmergencyContactRelationship(contactData.relationship),
            new EmergencyContactCreatedAt(new Date(contactData.created_at)),
          );
        },
      ),
      result.data.organizations.map(
        (orgData: {
          id: string;
          name: string;
          short_name: string;
          type: OrganizationTypeType;
          level: OrganizationLevelType;
          region?: string;
          province?: string;
          city?: string;
          barangay?: string;
          address?: string;
          phone?: string;
          website?: string;
          is_active: boolean;
          created_at: string;
        }) => {
          return new OrganizationLite({
            id: new OrganizationId(orgData.id),
            name: new OrganizationName(orgData.name),
            short_name: new OrganizationShortName(orgData.short_name),
            type: new OrganizationType(orgData.type),
            level: new OrganizationLevel(orgData.level),
            region: orgData.region
              ? new OrganizationRegion(orgData.region)
              : undefined,
            province: orgData.province
              ? new OrganizationProvince(orgData.province)
              : undefined,
            city: orgData.city ? new OrganizationCity(orgData.city) : undefined,
            barangay: orgData.barangay
              ? new OrganizationBarangay(orgData.barangay)
              : undefined,
            address: orgData.address
              ? new OrganizationAddress(orgData.address)
              : undefined,
            phone: orgData.phone
              ? new OrganizationAddress(orgData.phone)
              : undefined,
            website: orgData.website
              ? new OrganizationAddress(orgData.website)
              : undefined,
            is_active: new OrganizationIsActive(orgData.is_active),
            created_at: new OrganizationCreatedAt(orgData.created_at),
          });
        },
      ),
      new UserIsVerified(result.data.is_verified),
      new UserIsActive(result.data.is_active),
      result.data.profile_image_url
        ? new UserProfileImageUrl(result.data.profile_image_url)
        : undefined,
      result.data.last_login_at
        ? new UserLastLoginAt(new Date(result.data.last_login_at))
        : undefined,
      result.data.created_at
        ? new UserCreatedAt(new Date(result.data.created_at))
        : undefined,
    );
  }
  async logout(form: { refresh_token: SessionRefreshToken }) {}
}
