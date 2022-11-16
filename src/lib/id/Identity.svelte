<svelte:head>
    <script src="https://accounts.google.com/gsi/client" async defer></script>
</svelte:head>

<div class="dropdown dropdown-end">
    <label for="user-settings-modal" id="identity" class="btn btn-square btn-outline">
        <Avatar></Avatar>
    </label>

    <input type="checkbox" id="user-settings-modal" class="modal-toggle" />
    <label for="user-settings-modal" class="modal cursor-pointer">
        <label class="modal-box relative" for="">
            <div class="form-control">

                
            <div class="input-group justify-between">
                <div class="flex-col align-middle">
                    <h2 class="text-3xl font-bold"> {helloText} </h2>
                    <h3 class="py-2"> {helloDescription} </h3>
                </div>
                <button class="btn btn-circle btn-ghost w-2/12 h-auto" on:click={Identity.randomizeAvatar}>
                    <Avatar></Avatar>
                </button>
            </div>
            
            <div class="divider"></div> 

            <div style="display: {signedIn ? '' : 'none'}">
                <!-- Displayed when user is logged in -->
                <button class="btn btn-outline g_id_signout" on:click={Identity.signOut}>Logout</button>
            </div>
            <div style="display: {signedIn ? 'none' : ''}">
                <!-- Displayed when user is NOT logged in -->
                <div bind:this={signInPlaceholder}></div>   
            </div>
        </label>
    </label>
</div>

<script lang="ts"> 
    import Avatar from './avatar/Avatar.svelte';
    import { onMount } from 'svelte';
    import { Identity, user } from './Identity';
    
    let signInPlaceholder: HTMLElement;
    $: signedIn = $user?.gid !== undefined
    $: helloText = signedIn ? 'Hey, ' + $user?.firstName + '!' : 'Hey there!';
    $: helloDescription = signedIn ? `Your work is saved on the cloud.` : `Your work is only saved locally.`;

    onMount(async () => {
        // Initiliase Identity context
        Identity.init(google.accounts, signInPlaceholder);
    });
</script>