export default function (plop) {
	plop.setGenerator('component', {
		actions: [
			{
				path: '../src/lib/components/{{dashCase name}}/{{pascalCase name}}.svelte',
				templateFile: 'templates/component.hbs',
				type: 'add',
			},
			{
				path: '../src/lib/components/{{dashCase name}}/{{dashCase name}}.stories.svelte',
				templateFile: 'templates/component-stories.hbs',
				type: 'add',
			},
		],
		description: 'create new component structure',
		prompts: [
			{
				message: 'Component name',
				name: 'name',
				type: 'input',
			},
		],
	});

	plop.setGenerator('page', {
		actions: [
			{
				path: '../src/routes/{{dashCase name}}/+page.svelte',
				templateFile: 'templates/page.hbs',
				type: 'add',
			},
			{
				path: '../src/routes/{{dashCase name}}/+page.server.ts',
				templateFile: 'templates/page-server.hbs',
				type: 'add',
			},
		],
		description: 'create new page structure',
		prompts: [
			{
				message: 'page name',
				name: 'name',
				type: 'input',
			},
		],
	});
}
