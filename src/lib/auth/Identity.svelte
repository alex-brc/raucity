<svelte:head>
    <script src="https://accounts.google.com/gsi/client" async defer></script>
</svelte:head>

<div class="dropdown dropdown-end">
    <label tabindex="0" id="identity" class="btn placeholder">
        <div class="bg-neutral-focus text-neutral-content">
            <span class="text-3xl">A</span>
        </div>
    </label>
    <ul tabindex="0" class="dropdown-content menu shadow bg-base-100 mt-2">
        <li><div bind:this={signInPlaceholder}></div></li>
        <li><a class="g_id_signout" on:click={Identity.logOut}>Logout</a></li>
    </ul>
</div>

<script lang="ts">
    import { onMount } from 'svelte';
    import { Identity } from './Identity';

    let signInPlaceholder: HTMLElement

    onMount(async () => {
        // Initialise Google Identity Context
        Identity.initialiseContext(google.accounts);
        // Render sign in button
        google.accounts.id.renderButton(
            signInPlaceholder,
            { type: "standard", theme: "outline", text: "signin", size: "medium", logo_alignment: "left" });
    });
</script>