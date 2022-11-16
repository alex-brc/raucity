import type { GoogleJWTPayload } from "$lib/id/Identity";
import { Data } from "./Data";
import type { DataStructure } from "./DataStructure";
import { $Local } from "./DataStructure"

export class User implements DataStructure {
    gid?: string;
    avatarSeed: string;
    email?: string;
    name?: string;
    firstName?: string;
    lastName?: string;

    get key(): string {
        return this.gid || $Local;
    }

    constructor() {
        this.avatarSeed = Data.seed();
    }

    static fromJWT(jwt: GoogleJWTPayload, avatar?: string) : User {
        let user = new User();

        user.gid = jwt.sub;
        user.email = jwt.email
        user.name = jwt.name;
        user.firstName = jwt.given_name;
        user.lastName = jwt.family_name;

        user.avatarSeed = avatar || user.avatarSeed; 

        return user;
    }
}