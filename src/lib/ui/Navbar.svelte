<script>
    import Identity from "../auth/Identity.svelte";
</script>
<div class="navbar">
    <div class="flex-1">
        <div class="dropdown">
            <label tabindex="0" class="btn btn-outline btn-square normal-case w-36 text-3xl">raucity!</label>
            <ul tabindex="0" class="dropdown-content menu shadow bg-base-100 w-36 mt-2">
                <slot />
            </ul>
        </div>
    </div>
    <div class="flex-none">
        <Identity></Identity>
    </div>
</div>