<img src={avatarURL} style="display: {$user ? '' : 'none'}" alt="User Avatar"/>

<script lang="ts">
    import type { User } from "$lib/db/DataStructure";
    import { user } from "./Identity"

    $: avatarURL = generateDicebearAvatarURL($user);

    function generateDicebearAvatarURL(user?: User ) {
        console.log("generating avatar for user: ", user);
        if (!user)
            return '';
            
        // Build base URL
        let url = avatarConfig.url +  avatarConfig.version + '/api/' + avatarConfig.style + '/' + user.avatar + '.svg';

        // Enhance with additional options if available
        let options = Object.entries(avatarConfig.options) as [string, any][];

        // Concatenate options
        let optionsString = options.map(([key, value]) => key + '=' + value).join('&');

        // Put options into URL
        if(optionsString)
            url += '?' + optionsString

        return url;
    }

    var avatarConfig = {
        url: "https://avatars.dicebear.com/",
        version: 4.9,
        style: "big-smile",
        options: {
            flip: true,
        }
    } 
</script>