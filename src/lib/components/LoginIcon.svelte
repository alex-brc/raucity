<svelte:head>
    <script src="https://accounts.google.com/gsi/client" async defer></script>
</svelte:head>

<script lang="ts">
    import { onMount } from 'svelte';

    let handleCredentialResponse = async (response: any) => { console.log(response); }
    let buttonPlaceholder: HTMLDivElement;

    onMount(async () => {
        // Initialise Google Identity Context
        google.accounts.id.initialize({
            client_id: '502964778639-6fobrp4g6dbi0f3lh3c1sbm8kpb4750a.apps.googleusercontent.com',
            context: 'use',
            ux_mode: 'popup',
            callback: handleCredentialResponse
        });
        google.accounts.id.prompt();
    });
</script>

<div bind:this={buttonPlaceholder}></div>