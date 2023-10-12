<script>
	import '../app.css';
	import Dashboard from '../components/dashboard/index.svelte';
</script>

<html lang="en" class="h-full bg-gray-100">
	<body class="h-full">
		<Dashboard>
			<slot />
		</Dashboard>
	</body>
</html>
