<script lang="ts">
	import '../app.css';
	import { auth, db } from '$lib/firebase';
	import { onAuthStateChanged } from 'firebase/auth';
	import { onMount } from 'svelte';
	import { FirebaseApp } from 'sveltefire';
</script>

<html lang="en" class="h-full">
	<body class="h-full">
		<FirebaseApp {auth} firestore={db}>
			<slot />
		</FirebaseApp>
	</body>
</html>
