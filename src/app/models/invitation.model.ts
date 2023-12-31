import { Role, RoleNames } from "./role.model";

export class Invitation{
    id: string;
    organisationId: string;
    email: string;
    role: RoleNames;
    code: string;
    time: string;
}

export class AcceptInvitation{
    code: string;
}

export class NewInvitation{
    email: string;
    role: string;
}
