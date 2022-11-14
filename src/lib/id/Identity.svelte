<svelte:head>
    <script src="https://accounts.google.com/gsi/client" async defer></script>
</svelte:head>

<div class="dropdown dropdown-end">
    <label tabindex="0" id="identity" class="btn btn-square btn-outline">
        <Avatar></Avatar>
    </label>
    <ul tabindex="0" class="dropdown-content menu shadow bg-base-100 mt-2">
        <li style="display: {shownWhileSignedOut}"><div bind:this={signInPlaceholder}></div></li>
        <li style="display: {shownWhileSignedIn}"><a class="g_id_signout" on:click={Identity.signOut}>Logout</a></li>
    </ul>
</div>

<script lang="ts">
    import Avatar from './Avatar.svelte';
    import { onMount, createEventDispatcher, setContext } from 'svelte';
    import { Identity, IdentityContext } from './Identity';

    let signInPlaceholder: HTMLElement;

    let identity = new Identity();
    setContext<Identity>(IdentityContext, identity);

    $: shownWhileSignedIn =  identity.signedIn ? '' : 'none';
    $: shownWhileSignedOut = identity.signedIn ? 'none' : '';

    onMount(async () => {
        // Initiliase Identity context
        identity.init(google.accounts, signInPlaceholder);
    });
</script>