import type { GoogleJWTPayload } from "$lib/id/Identity";

export interface DataStructure {
    get key() : string;
}

export class User implements DataStructure {
    static $Local: string = `$Local`;

    gid: string | undefined;
    avatar: string;
    email: string | undefined;
    name: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;

    get key(): string {
        return this.gid || User.$Local;
    }

    constructor() {
        this.avatar = Math.floor(Math.random() * 1000000).toString();
    }

    static fromJWT(jwt: GoogleJWTPayload, avatar?: string) : User {
        let user = new User();

        user.gid = jwt.sub;
        user.email = jwt.email
        user.name = jwt.name;
        user.firstName = jwt.given_name;
        user.lastName = jwt.family_name;

        user.avatar = avatar || user.avatar; 

        return user;
    }
}