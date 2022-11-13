export class Avatar {
    private static config = {
        url: "https://avatars.dicebear.com/",
        version: 4.9,
        style: "big-smile",
        options: {
            flip: true,
        }
    } 

    public static generateURL(seed: string, background?: string) {
        // Build base URL
        let url = Avatar.config.url +  Avatar.config.version + '/api/' + Avatar.config.style + '/' + seed + '.svg';

        // Enhance with additional options if available
        let options = Object.entries(Avatar.config.options) as [string, any][];

        // Concatenate options
        let optionsString = options.map(([key, value]) => key + '=' + value).join('&');

        // Put options into URL
        if(optionsString)
            url += '?' + optionsString

        return url;
    }
}