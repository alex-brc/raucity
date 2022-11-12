let process: any;

const p = process?.env ? process.env : import.meta.env;

export const googleClientId: string = p.VITE_GOOGLE_CLIENT_ID;