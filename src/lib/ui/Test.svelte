<button class="btn btn-outline" on:click={writeUser}> Create new user </button>
<button class="btn btn-outline" on:click={readUser}> Logout </button>

<script>
    import { Data } from "$lib/db/Data";
    import { User } from "$lib/db/DataStructure";
    import { user, Identity } from "$lib/id/Identity"

    let testUser = new User();

    let writeUser = () => { testUser = new User(); console.log(testUser); Data.write(testUser); user.set(testUser); }
    let readUser = () => { Identity.signOut() }

</script>