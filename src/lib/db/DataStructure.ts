import type { GoogleJWTPayload } from "$lib/auth/Identity";
import { v4 as generateUUID } from "uuid";

export interface DataStructure {
    get key() : string;
}

export class User implements DataStructure {
    uuid: string;
    gid: string | undefined;
    email: string | undefined;
    name: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;

    get key(): string {
        return this.uuid;
    }

    constructor (jwt?: GoogleJWTPayload) {
        this.uuid = generateUUID();
        this.gid = jwt?.sub || "N/A";
        this.email = jwt?.email || "N/A";
        this.name = jwt?.name || "N/A";
        this.firstName = jwt?.given_name || "N/A";
        this.lastName = jwt?.family_name || "N/A";
    }
}