<img bind:this={placeholder} alt="User Avatar" class="hidden w-auto"/>

<script lang="ts">
    import { getContext, onMount } from "svelte";
    import { Identity, IdentityContext } from "./Identity";
    import { Avatar } from "./Avatar";

    let placeholder: HTMLImageElement;

    const identity = getContext<Identity>(IdentityContext);

    onMount(async () => {
        // Render avatar
        placeholder.src = Avatar.generateURL(identity.user.avatar);
        placeholder.classList.remove('hidden');
    });
</script>