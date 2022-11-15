<svelte:head>
    <script src="https://accounts.google.com/gsi/client" async defer></script>
</svelte:head>

<div class="dropdown dropdown-end">
    <label tabindex="0" id="identity" class="btn btn-square btn-outline">
        <Avatar></Avatar>
    </label>
    <ul class="dropdown-content menu shadow bg-base-100 mt-2">
        <li style="display: {signedIn ? 'none' : ''}"><div bind:this={signInPlaceholder}></div></li>
        <li style="display: {signedIn ? '' : 'none'}"><a class="g_id_signout" on:click={signOut}>Logout</a></li>
    </ul>
</div>

<script lang="ts"> 
    import Avatar from './Avatar.svelte';
    import { onMount } from 'svelte';
    import { Identity, user } from './Identity';
    
    let signInPlaceholder: HTMLElement;
    $: signedIn = $user?.gid !== undefined
    let signOut = () => { Identity.signOut(); }

    onMount(async () => {
        // Initiliase Identity context
        Identity.init(google.accounts, signInPlaceholder);
    });
</script>