import type { GsiButtonConfiguration, IdConfiguration } from "google-one-tap";

let process: any;

const p = process?.env ? process.env : import.meta.env;

export const gsiButtonConfiguration: GsiButtonConfiguration = { 
    type: "standard", 
    theme: "outline", 
    text: "signin", 
    size: "medium", 
    logo_alignment: "left" 
}
export const idConfiguration: IdConfiguration = {
    client_id: p.VITE_GOOGLE_CLIENT_ID,
    // auto_select: true,
    context: 'use',
    ux_mode: 'popup',
}

export const avatarConfig = {
    url: "https://avatars.dicebear.com/",
    version: 4.9,
    style: "big-smile",
    options: {
        flip: true,
    }
} 

export const threeConfig = {
    camera: {
        fov: 75,
        near: 0.1,
        far: 1000
    }
} 