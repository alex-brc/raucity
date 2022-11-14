import type { CredentialResponse, RevocationResponse, accounts } from "google-one-tap";
import jwt_decode from "jwt-decode";
import { googleClientId } from "$lib/config";
import { Data } from "$lib/db/Data";
import { User } from "$lib/db/DataStructure";
import { readable, writable } from "svelte/store";

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

export const currentUser = writable();

export class Identity {
    private _jwt?: GoogleJWTPayload;
    
    private _user?: User;
    public get user() : User | undefined {
        return this._user;
    }
    public set user(v : User | undefined) {
        this._user = v;
        console.log('Before');
        currentUser.set(this._user);
        console.log('After');
    }

    public init(api: accounts, signInPlaceholder: HTMLElement) {
        this.user = Identity.getUser();

        // Initialise the Identity API
        api.id.initialize({
            client_id: googleClientId,
            // auto_select: true,
            context: 'use',
            ux_mode: 'popup',
            callback: this.signIn
        });

        // Render sign in button
        api.id.renderButton(
            signInPlaceholder,
            { type: "standard", theme: "outline", text: "signin", size: "medium", logo_alignment: "left" });
    }
    
    public signIn (response: CredentialResponse) {
        // Attempt to decode JWT
        this._jwt = jwt_decode(response.credential);

        // Switch to authenticated User
        this.user = Identity.getUser(this._jwt);
    }

    public signOut () {
        let onSignOut = (response: RevocationResponse) => {
            if(response.successful) {
                // Grab local user
                this.user = Identity.getUser();
            }
        }
        
        if(this._jwt) {
            google.accounts.id.revoke(this._jwt.sub, onSignOut);
        }
    }

    private static getUser(jwt?: GoogleJWTPayload) {
        let user = Data.read(User.name, jwt?.sub || User.$Local) as User;
        // If user does not exist, create new user from JWT
        if(!user) {
            console.log('Creating new User...');
            user = jwt ? User.fromJWT(jwt) : new User();
            Data.write(user);
        }
        console.log('User: ', user);
        return user;
    }
}

export const identity = readable(new Identity());