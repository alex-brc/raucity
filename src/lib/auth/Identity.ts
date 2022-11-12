import type { IdConfiguration, CredentialResponse } from "google-one-tap";
import jwt_decode from "jwt-decode";
import { googleClientId } from "$lib/config";


let handleCredentialResponse = (response: CredentialResponse) => { 
    console.log('Response: ', response);
    let jwt = jwt_decode(response.credential);
    console.log('JWT: ', jwt);
}
export var idConfig: IdConfiguration = {
    client_id: googleClientId,
    context: 'use',
    ux_mode: 'popup',
    callback: handleCredentialResponse
}

export class Identity {
    #jwt: any;
    
    constructor(response: CredentialResponse) {
        console.log('Response: ', response);
        this.#jwt = jwt_decode(response.credential);
        console.log('JWT: ', this.#jwt);
    }
}