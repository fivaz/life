<script lang="ts">
	import { auth, db } from '$lib/firebase';
	import { FirebaseApp } from 'sveltefire';

	import '../app.css';
</script>

<html class="h-full" lang="en">
	<body class="h-full">
		<FirebaseApp {auth} firestore={db}>
			<slot />
		</FirebaseApp>
	</body>
</html>
