/** @type { import("eslint").Linter.Config } */
module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'prettier',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'plugin:sonarjs/recommended',
		'plugin:perfectionist/recommended-natural',
		'plugin:storybook/recommended',
	],
	parser: '@typescript-eslint/parser',
	plugins: [
		'@typescript-eslint',
		'import-no-duplicates-prefix-resolved-path',
		'unused-imports',
		'sonarjs',
		'perfectionist',
	],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte'],
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
			},
		},
		{
			files: ['*.stories.svelte'],
			rules: {
				'no-console': 'off',
			},
		},
	],
	settings: {
		'import/resolver': {
			typescript: true,
			node: true,
		},
	},
	rules: {
		'no-console': 'error',
		'@typescript-eslint/no-unused-vars': 'off',
		'import/no-unresolved': [
			'error',
			{
				ignore: [
					'^\\$app/stores',
					'^\\$app/navigation',
					'^\\$app/environment',
					'^\\$env/static/public',
					'^\\$service-worker',
				],
			},
		],
		'import/no-duplicates': 'off',
		'import-no-duplicates-prefix-resolved-path/no-duplicates': [
			'error',
			{
				prefixResolvedPathWithImportName: true,
			},
		],
		'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
		'unused-imports/no-unused-imports': 'warn',
		'unused-imports/no-unused-vars': [
			'warn',
			{
				vars: 'all',
				varsIgnorePattern: '^_',
				args: 'after-used',
				argsIgnorePattern: '^_',
				ignoreRestSiblings: true,
			},
		],
	},
};
