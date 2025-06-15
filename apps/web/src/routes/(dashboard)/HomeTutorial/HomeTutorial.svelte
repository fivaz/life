<script lang="ts">
	import { onMount } from 'svelte';
	import introJs from 'intro.js';
	import { getSteps, resetData } from './service';
	import { currentUser } from '$lib/user/user.utils.svelte';

	// onMount(() => {
	// 	const intro = introJs();
	//
	// 	const createEventButton = document.querySelector("#tutorial-create-event-button") as HTMLElement
	//
	// 	intro.setOptions(getSteps(createEventButton));
	//
	// 	intro.start();
	//
	// 	createEventButton?.addEventListener('click', () => {
	// 		// L'utilisateur a cliqué → continuer le tutoriel
	// 		intro.nextStep(); // ou intro.start(), ou ce que tu veux faire après
	// 	});
	// });

	$effect(() => {
		if(currentUser.uid){
			resetData();
		}
	})
</script>