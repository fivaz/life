<script lang="ts">
	import { auth, db } from '$lib/firebase';
	import { FirebaseApp } from 'sveltefire';

	import '../app.css';
</script>

<FirebaseApp {auth} firestore={db}>
	<slot />
</FirebaseApp>
