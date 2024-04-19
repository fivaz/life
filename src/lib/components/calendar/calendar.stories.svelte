<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import Calendar from './Calendar.svelte';
	export const meta = {
		argTypes: {},
		component: Calendar,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<Calendar>;

	import { connectAuthEmulator, getAuth } from 'firebase/auth';
	import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
	import { FirebaseApp } from 'sveltefire';

	const db = getFirestore();
	connectFirestoreEmulator(db, '127.0.0.1', 8080);

	const auth = getAuth();
	connectAuthEmulator(auth, 'http://127.0.0.1:9099');
</script>

<Template let:args>
	<FirebaseApp {auth} firestore={db}>
		<div class="h-screen">
			<Calendar {...args} />
		</div>
	</FirebaseApp>
</Template>

<Story args={{}} name="Primary" />
