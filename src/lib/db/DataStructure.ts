import type { GoogleJWTPayload } from "$lib/auth/Identity";

export interface DataStructure {
    get key() : string;
}

export class User implements DataStructure {
    static $Local: string = `$Local`;

    gid: string | undefined;
    email: string | undefined;
    name: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;

    get key(): string {
        return this.gid || User.$Local;
    }

    constructor (jwt?: GoogleJWTPayload) {
        this.gid = jwt?.sub || undefined;
        this.email = jwt?.email || "N/A";
        this.name = jwt?.name || "N/A";
        this.firstName = jwt?.given_name || "N/A";
        this.lastName = jwt?.family_name || "N/A";
    }
}