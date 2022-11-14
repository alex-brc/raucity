<svelte:head>
    <script src="https://accounts.google.com/gsi/client" async defer></script>
</svelte:head>

<div class="dropdown dropdown-end">
    <label tabindex="0" id="identity" class="btn btn-square btn-outline">
        <Avatar></Avatar>
    </label>
    <ul tabindex="0" class="dropdown-content menu shadow bg-base-100 mt-2">
        <li style="display: {shownWhileSignedOut}"><div bind:this={signInPlaceholder}></div></li>
        <li style="display: {shownWhileSignedIn}"><a class="g_id_signout" on:click={$identity.signOut}>Logout</a></li>
    </ul>
</div>

<script lang="ts">
    import Avatar from './Avatar.svelte';
    import { onMount } from 'svelte';
    import { currentUser, identity } from './Identity';
    
    let signInPlaceholder: HTMLElement;

    $: shownWhileSignedOut =  $currentUser ? '' : 'none';
    $: shownWhileSignedIn = $currentUser ? 'none' : '';

    onMount(async () => {
        // Initiliase Identity context
        $identity.init(google.accounts, signInPlaceholder);
    });
</script>