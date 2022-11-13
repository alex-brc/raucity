import type { IdConfiguration, CredentialResponse, RevocationResponse, accounts } from "google-one-tap";
import jwt_decode from "jwt-decode";
import { googleClientId } from "$lib/config";

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
    static #instance: Identity;

    jwt?: GoogleJWTPayload;
    api: accounts;
    loggedIn: boolean;

    constructor(api: accounts) {
        this.api = api;
        this.loggedIn = false;
    }

    public static logIn (response: CredentialResponse) {
        let instance = Identity.#instance;
        console.log('Got credential from ', response.select_by);
        try {
            instance.jwt = jwt_decode(response.credential);
            console.log('Decoded JWT: ', instance.jwt);
        }
        catch(e) {
            console.error(e);
        }
        finally {
            instance.loggedIn = true;
            console.log('Logged in', instance.loggedIn);
        }
    }

    public static logOut () {
        let instance = Identity.#instance;
        console.log("Logging out...");

        function onLogOut(response: RevocationResponse) {
            console.log('Logout success: ', response.successful);
        }
        
        console.log('Is logged in? ', instance.loggedIn);
        if(instance.loggedIn && instance.jwt) {
            instance.api.id.revoke(instance.jwt.sub, onLogOut);
            instance.loggedIn = false;
        }
    }

    public static initialiseContext (api: accounts) {
        // Construct instance
        let instance = new Identity(api);

        // Google Identity settings
        let idConfig: IdConfiguration = {
            client_id: googleClientId,
            // auto_select: true,
            context: 'use',
            ux_mode: 'popup',
            callback: Identity.logIn
        }

        // Call the Identity API
        instance.api.id.initialize(idConfig);

        Identity.#instance = instance;
    }
}
