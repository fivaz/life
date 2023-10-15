<script>
	import '../app.css';
	import Dashboard from '$lib/components/dashboard/Dashboard.svelte';
</script>

<html lang="en" class="h-full bg-gray-50">
	<body class="h-full">
		<Dashboard>
			<slot />
		</Dashboard>
	</body>
</html>
