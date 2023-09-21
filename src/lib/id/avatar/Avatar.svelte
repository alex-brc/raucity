<img src={avatarURL} alt="User Avatar" class="h-auto w-auto"/>

<script lang="ts">
    import { user } from "../Identity"
    import { generateAvatarURL } from "./Avatar"

    $: avatarURL = generateAvatarURL($user);
</script>