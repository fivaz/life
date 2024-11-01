import prettier from 'eslint-config-prettier';
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import ts from 'typescript-eslint';
import unusedImports from 'eslint-plugin-unused-imports';

export default ts.config(
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
	},
	{
		plugins: {
			'unused-imports': unusedImports,
		},
	},
	{
		files: ['**/*.svelte'],

		languageOptions: {
			parserOptions: {
				parser: ts.parser,
			},
		},
	},
	{
		rules: {
			'@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
			'unused-imports/no-unused-imports': 'error',
		},
	},
	{
		ignores: ['build/', '.svelte-kit/', 'dist/', '.vercel/'],
	},
);
