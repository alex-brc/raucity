<button class="btn btn-outline" on:click={writeUser}> Write </button>
<button class="btn btn-outline" on:click={readUser}> Read </button>

<script>
    import { Data } from "$lib/db/Data";
    import { User } from "$lib/db/DataStructure";

    let testUser = new User();

    let writeUser = () => { console.log(testUser); Data.write(testUser); }
    let readUser = () => { console.log(Data.read(User.name, testUser.key)) }

</script>