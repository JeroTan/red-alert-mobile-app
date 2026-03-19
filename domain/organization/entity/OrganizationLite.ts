import { OrganizationAddress } from "../value-objects/location/OrganizationAddress";
import { OrganizationBarangay } from "../value-objects/location/OrganizationBarangay";
import { OrganizationCity } from "../value-objects/location/OrganizationCity";
import { OrganizationProvince } from "../value-objects/location/OrganizationProvince";
import { OrganizationRegion } from "../value-objects/location/OrganizationRegion";
import { OrganizationId } from "../value-objects/OrganizationId";
import { OrganizationLevel } from "../value-objects/OrganizationLevel";
import { OrganizationName } from "../value-objects/OrganizationName";
import { OrganizationShortName } from "../value-objects/OrganizationShortName";
import { OrganizationType } from "../value-objects/OrganizationType";
import { OrganizationIsActive } from "../value-objects/status/OrganizationIsActive";
import { OrganizationCreatedAt } from "../value-objects/timestamp/OrganizationCreatedAt";

type Props = {
  id: OrganizationId;
  name: OrganizationName;
  short_name: OrganizationShortName;
  type: OrganizationType;
  level: OrganizationLevel;
  region?: OrganizationRegion;
  province?: OrganizationProvince;
  city?: OrganizationCity;
  barangay?: OrganizationBarangay;
  address?: OrganizationAddress;
  phone?: OrganizationAddress;
  website?: OrganizationAddress;
  is_active: OrganizationIsActive;
  created_at: OrganizationCreatedAt;
};

export class OrganizationLite implements Props {
  id: OrganizationId;
  name: OrganizationName;
  short_name: OrganizationShortName;
  type: OrganizationType;
  level: OrganizationLevel;
  region?: OrganizationRegion | undefined;
  province?: OrganizationProvince | undefined;
  city?: OrganizationCity | undefined;
  barangay?: OrganizationBarangay | undefined;
  address?: OrganizationAddress | undefined;
  phone?: OrganizationAddress | undefined;
  website?: OrganizationAddress | undefined;
  is_active: OrganizationIsActive;
  created_at: OrganizationCreatedAt;
  constructor(props: Props) {
    this.id = props.id;
    this.name = props.name;
    this.short_name = props.short_name;
    this.type = props.type;
    this.level = props.level;
    this.region = props.region;
    this.province = props.province;
    this.city = props.city;
    this.barangay = props.barangay;
    this.address = props.address;
    this.phone = props.phone;
    this.website = props.website;
    this.is_active = props.is_active;
    this.created_at = props.created_at;
  }
}
