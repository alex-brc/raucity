<script>
    import Identity from "./Identity.svelte";
    import Menu from "./Menu.svelte";
</script>
<div class="navbar">
    <div class="flex-1">
        <Menu> 
            <slot />
        </Menu>
    </div>
    <div class="flex-none">
        <Identity></Identity>
    </div>
</div>