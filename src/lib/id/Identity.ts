import type { IdConfiguration, CredentialResponse, RevocationResponse, accounts } from "google-one-tap";
import jwt_decode from "jwt-decode";
import { googleClientId } from "$lib/config";
import { Data } from "$lib/db/Data";
import { User } from "$lib/db/DataStructure";

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

export class Identity {
    static #instance : Identity;
    public static get instance() : Identity {
        if(!Identity.#instance)
            Identity.#instance = new Identity()
        return Identity.#instance;
    }
    
    user: User;
    #jwt?: GoogleJWTPayload;
    stateCallback?: (state: boolean) => void;

    private _signedIn : boolean;
    public get signedIn() : boolean {
        return this._signedIn;
    }
    public set signedIn(v : boolean) {
        this._signedIn = v;
        this.stateCallback?.(v);
    }

    constructor() {
        this._signedIn = false; 

        // Retrieve locally stored user data
        this.user = Identity.getUser();

        // Initialise the Identity API
        google.accounts.id.initialize({
            client_id: googleClientId,
            // auto_select: true,
            context: 'use',
            ux_mode: 'popup',
            callback: Identity.signIn
        });
    }
    
    public static signIn (response: CredentialResponse) {
        // Attempt to decode JWT
        Identity.instance.#jwt = jwt_decode(response.credential);

        // Switch to authenticated User
        Identity.instance.user = Identity.getUser(Identity.instance.#jwt);

        // Update state
        Identity.instance.signedIn = true;
    }

    public static signOut () {
        function onSignOut(response: RevocationResponse) {
            if(response.successful) {
                // Grab local user
                Identity.instance.user = Identity.getUser();
                Identity.instance.signedIn = false;
            }
        }
        
        if(Identity.instance.signedIn && Identity.instance.#jwt) {
            google.accounts.id.revoke(Identity.instance.#jwt.sub, onSignOut);
        }
    }

    private static getUser(jwt?: GoogleJWTPayload) {
        let user = Data.read(User.name, jwt?.sub || User.$Local) as User;
        // If user does not exist, create new user from JWT
        if(!user) {
            console.log('Creating new User...');
            user = new User(jwt);
            Data.write(user);
        }
        console.log('User: ', user);
        return user;
    }
}
