export default function (plop) {
	plop.setGenerator('component', {
		description: 'create new component structure',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'Component name',
			},
		],
		actions: [
			{
				type: 'add',
				path: '../src/lib/components/{{dashCase name}}/{{pascalCase name}}.svelte',
				templateFile: 'templates/component.hbs',
			},
			{
				type: 'add',
				path: '../src/lib/components/{{dashCase name}}/{{dashCase name}}.stories.svelte',
				templateFile: 'templates/component-stories.hbs',
			},
		],
	});

	plop.setGenerator('page', {
		description: 'create new page structure',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'page name',
			},
		],
		actions: [
			{
				type: 'add',
				path: '../src/routes/{{dashCase name}}/+page.svelte',
				templateFile: 'templates/page.hbs',
			},
			{
				type: 'add',
				path: '../src/routes/{{dashCase name}}/+page.server.ts',
				templateFile: 'templates/page-server.hbs',
			},
		],
	});
}
