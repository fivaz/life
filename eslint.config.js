import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import perfectionist from 'eslint-plugin-perfectionist';
import perfectionistNatural from 'eslint-plugin-perfectionist/configs/recommended-natural';
import sonarjs from 'eslint-plugin-sonarjs';
import svelte from 'eslint-plugin-svelte';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import ts from 'typescript-eslint';

const sonarjsRecommended = sonarjs.configs.recommended;

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
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
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: ts.parser,
			},
		},
	},
	{
		ignores: ['build/', '.svelte-kit/', 'dist/', '.vercel/'],
	},
	{
		rules: {
			'@typescript-eslint/no-unused-vars': 'off',
		},
	},
	{
		plugins: {
			perfectionist,
			'unused-imports': unusedImports,
		},
	},
	sonarjsRecommended,
	perfectionistNatural,
	{
		rules: {
			'perfectionist/sort-intersection-types': 'off',
		},
	},
	{
		rules: {
			'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
			'unused-imports/no-unused-imports': 'error',
			'unused-imports/no-unused-vars': [
				'warn',
				{
					args: 'after-used',
					argsIgnorePattern: '^_',
					ignoreRestSiblings: true,
					vars: 'all',
					varsIgnorePattern: '^_',
				},
			],
		},
	},
	{
		ignores: ['**/*.stories.svelte'],
		rules: {
			'no-console': ['error', { allow: ['warn', 'error'] }],
		},
	},
];
