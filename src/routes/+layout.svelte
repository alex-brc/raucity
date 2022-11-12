<script>
    import Navbar from '$lib/components/Navbar.svelte';
	import '$lib/global.css';
</script>

<Navbar>
	<li><a>Item 1</a></li>
	<li><a>Item 2</a></li>
</Navbar>

<slot />
