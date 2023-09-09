<div bind:this={rendererContainer} class="w-screen h-screen"></div>

<script lang="ts">
    import { onMount } from "svelte";
    import * as Three from "./Three";

    let rendererContainer: HTMLDivElement;

    onMount(async () => {
        Three.init(rendererContainer);
    });
</script>