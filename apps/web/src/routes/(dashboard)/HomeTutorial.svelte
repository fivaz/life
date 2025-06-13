<script lang="ts">
	import { onMount } from 'svelte';
	import introJs from 'intro.js';

	onMount(() => {
		const intro = introJs();

		intro.setOptions({
			steps: [
				// {
				// 	intro: `
        //     <div style="text-align:center">
        //       <h2>Bienvenue sur Life</h2>
        //       <p>Votre compagnon pour planifier, accomplir et progresser.</p>
        //       <p style="margin-top:10px">👉 <strong>Voir comment ça marche</strong></p>
        //     </div>`
				// },
				// {
				// 	element: document.querySelector("a[href='/']") as HTMLElement,
				// 	intro: 'Vous êtes dans l’onglet <strong>Calendrier</strong>',
				// 	position: 'bottom'
				// },
				{
					element: document.querySelector("#tutorial-create-event-button") as HTMLElement,
					intro: `Prêt à planifier ? Cliquez ici pour ajouter un événement.`,
					position: 'left',
					disableInteraction: false,
					tooltipClass: 'hide-buttons'
				}
			],
			showBullets: false,
			showProgress: true,
			exitOnOverlayClick: false,
			nextLabel: 'Suivant',
			prevLabel: 'Précédent'
		});

		intro.start();
	});
</script>