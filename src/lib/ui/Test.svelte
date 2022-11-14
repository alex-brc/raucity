<button class="btn btn-outline" on:click={writeUser}> Create new user </button>
<button class="btn btn-outline" on:click={readUser}> Read user </button>

<script>
    import { Data } from "$lib/db/Data";
    import { User } from "$lib/db/DataStructure";
    import { identity } from "$lib/id/Identity"

    let testUser = new User();

    let writeUser = () => { testUser = new User(); console.log(testUser); Data.write(testUser); $identity.user = testUser; }
    let readUser = () => { console.log(Data.read(User.name, testUser.key)) }

</script>