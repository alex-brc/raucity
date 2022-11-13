<img bind:this={placeholder} alt="User Avatar" class="hidden w-auto"/>

<script lang="ts">
    import { onMount } from "svelte";
    import { Identity } from "./Identity";
    import { Avatar } from "./Avatar";

    let placeholder: HTMLImageElement;

    onMount(async () => {
        // Render avatar
        placeholder.src = Avatar.generateURL(Identity.instance.user.avatar);
        placeholder.classList.remove('hidden');
    });
</script>