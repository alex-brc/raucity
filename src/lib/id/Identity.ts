import type { CredentialResponse, RevocationResponse, accounts } from "google-one-tap";
import jwt_decode from "jwt-decode";
import { Data } from "$lib/db/Data";
import { $Local } from "$lib/db/DataStructure";
import { User } from "$lib/db/User"
import { get, writable } from "svelte/store";
import { gsiButtonConfiguration, idConfiguration } from "$lib/config";

export interface GoogleJWTPayload {
    iss: string; // e.g.:"https://accounts.google.com", The JWT's issuer
    nbf: number; // e.g.:161803398874
    aud: string; // e.g.:"314159265-pi.apps.googleusercontent.com", Your server's client ID
    sub: string; // e.g.:"3141592653589793238", The unique ID of the user's Google Account
    hd: string; // e.g.:"gmail.com", If present, the host domain of the user's GSuite email address
    email: string; // e.g.:"elisa.g.beckett@gmail.com", The user's email address
    email_verified: boolean; // e.g.: true, If Google has verified the email address
    azp: string; // e.g.: "314159265-pi.apps.googleusercontent.com"
    name: string; // e.g.: "Elisa Beckett"
    picture: string; // e.g.: If present, a URL to user's profile picture
    given_name: string; // e.g.: "Elisa"
    family_name: string; // e.g.: "Beckett"
    iat: number; // e.g.:1596474000, Unix timestamp of the assertion's creation time
    exp: number; // e.g.:1596477600, Unix timestamp of the assertion's expiration time
    jti: string; // e.g.:"abc161803398874def"
}

export const user = writable<User | undefined>();

export class Identity {
    private static _api?: accounts;

    public static init(api: accounts, signInPlaceholder: HTMLElement) {
        user.set( Identity.loadUser() );

        // Initialise the Identity API
        idConfiguration.callback = Identity.signIn;
        api.id.initialize(idConfiguration);

        // Render sign in button
        api.id.renderButton(
            signInPlaceholder,
            gsiButtonConfiguration);

        // Save API for later
        Identity._api = api;
    }
    
    public static signIn (response: CredentialResponse) {
        // Attempt to decode JWT
        let jwt = jwt_decode(response.credential) as GoogleJWTPayload;

        // Switch to authenticated User
        user.set( Identity.loadUser(jwt) );
    }

    public static signOut () {
        let onSignOut = (response: RevocationResponse) => {
            if(response.successful) {
                // Load local user
                user.set( Identity.loadUser() );
            }
        }

        let currentUser = get(user);

        if(currentUser?.gid) {
            Identity._api?.id.revoke(currentUser.gid, onSignOut);
        }
    }

    public static randomizeAvatar() {
        let currentUser = Object.assign(new User(), get(user));
        console.log("current is ", currentUser);
        if(!currentUser)
            return;
        
        currentUser.avatarSeed = Data.seed();

        user.set(currentUser);

        Data.write(currentUser);
    }

    private static loadUser(jwt?: GoogleJWTPayload) {
        let user = Data.read(User.name, jwt?.sub || $Local) as User;

        // If user does not exist, create new user from JWT
        if(!user) {
            console.log('Creating new User...');
            user = jwt ? User.fromJWT(jwt) : new User();
            Data.write(user);
        }

        return user;
    }
}