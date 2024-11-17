export default function (plop) {
	plop.setGenerator('component', {
		description: 'A UI Component',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'Enter the component path (relative to src/, e.g., components/my-awesome-button):',
			},
		],
		actions: (data) => {
			// Extracting the component name from the path
			const parts = data.name.split('/');
			const componentName = parts[parts.length - 1];

			data.pathPath = parts
				.map((part) =>
					part.startsWith('(') && part.endsWith(')') ? part : plop.getHelper('dashCase')(part),
				)
				.join('/');
			data.componentName = plop.getHelper('pascalCase')(componentName);
			data.storyName = plop.getHelper('dashCase')(componentName);

			return [
				{
					type: 'add',
					path: '../src/{{pathPath}}/{{componentName}}.svelte',
					templateFile: 'templates/Component.svelte.hbs',
				},
				{
					type: 'add',
					path: '../src/{{pathPath}}/{{storyName}}.stories.svelte',
					templateFile: 'templates/Component.stories.svelte.hbs',
				},
			];
		},
	});
}
