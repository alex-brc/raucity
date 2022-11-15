<img src={avatarURL} style="display: {$user ? '' : 'none'}" alt="User Avatar"/>

<script lang="ts">
    import { user } from "../Identity"
    import { generateDicebearAvatarURL } from "./Avatar"

    $: avatarURL = generateDicebearAvatarURL($user);
</script>