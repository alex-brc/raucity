import type { GoogleJWTPayload } from "$lib/id/Identity";
import type { DataStructure } from "./DataStructure";
import { $Local } from "./DataStructure"

export class User implements DataStructure {
    gid?: string;
    avatar: {
        seed: string;
    }
    email?: string;
    name?: string;
    firstName?: string;
    lastName?: string;

    get key(): string {
        return this.gid || $Local;
    }

    constructor() {
        this.avatar = {
            seed: Math.floor(Math.random() * 1000000).toString(),
        }
    }

    static fromJWT(jwt: GoogleJWTPayload, avatar?: string) : User {
        let user = new User();

        user.gid = jwt.sub;
        user.email = jwt.email
        user.name = jwt.name;
        user.firstName = jwt.given_name;
        user.lastName = jwt.family_name;

        user.avatar.seed = avatar || user.avatar.seed; 

        return user;
    }
}