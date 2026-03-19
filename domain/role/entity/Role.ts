import { RoleId } from "../value-objects/RoleId";
import { RoleName } from "../value-objects/RoleName";

export class Role {
  constructor(
    public id: RoleId,
    public name: RoleName,
  ) {}
}

export class RoleLite {
  constructor(public name: RoleName) {}
}
