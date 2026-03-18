import { EmergencyContactCreatedAt } from "../value-objects/EmergencyContactCreatedAt";
import { EmergencyContactId } from "../value-objects/EmergencyContactId";
import { EmergencyContactName } from "../value-objects/EmergencyContactName";
import { EmergencyContactPhone } from "../value-objects/EmergencyContactPhone";
import { EmergencyContactRelationship } from "../value-objects/EmergencyContactRelationship";

export class EmergencyContact {
  constructor(
    public id: EmergencyContactId,
    public name: EmergencyContactName,
    public phone: EmergencyContactPhone,
    public relationship: EmergencyContactRelationship,
    public createdAt: EmergencyContactCreatedAt,
  ) {}
}
