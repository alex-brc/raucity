
import { avatarConfig } from "$lib/config";
import type { User } from "$lib/db/User";

export function generateAvatarURL(user?: User ) {
    if (!user)
        return '';

    // Build base URL
    let url = avatarConfig.url +  avatarConfig.version + '/api/' + avatarConfig.style + '/' + user.avatarSeed + '.svg';

    // Enhance with additional options if available
    let options = Object.entries(avatarConfig.options) as [string, any][];

    // Concatenate options
    let optionsString = options.map(([key, value]) => key + '=' + value).join('&');

    // Put options into URL
    if(optionsString)
        url += '?' + optionsString

    return url;
}