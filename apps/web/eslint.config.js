import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import svelte from 'eslint-plugin-svelte';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import ts from 'typescript-eslint';

export default ts.config(
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	importPlugin.flatConfigs.recommended,
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
			'simple-import-sort': simpleImportSort,
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
		files: ['**/*.stories.svelte'],
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
		},
	},
	{
		rules: {
			'simple-import-sort/imports': 'error',
			'simple-import-sort/exports': 'error',
		},
	},
	{
		rules: {
			'import/export': 'error',
			'import/no-deprecated': 'error',
			'import/no-empty-named-blocks': 'warn',
			'import/no-mutable-exports': 'error',
			'import/no-named-as-default': 'error',
			'import/no-named-as-default-member': 'error',
			'import/no-unused-modules': 'error',
			'import/no-amd': 'error',
			'import/no-commonjs': 'error',
			'import/no-import-module-exports': 'warn',
			'import/no-nodejs-modules': 'error',
			'import/default': 'error',
			'import/namespace': 'error',
			'import/no-absolute-path': 'warn',
			'import/no-cycle': 'error',
			'import/no-dynamic-require': 'error',
			'import/no-relative-packages': 'warn',
			'import/no-restricted-paths': 'error',
			'import/no-self-import': 'error',
			'import/no-useless-path-segments': 'warn',
			'import/no-webpack-loader-syntax': 'error',
			'import/consistent-type-specifier-style': 'warn',
			'import/dynamic-import-chunkname': 'warn',
			'import/first': 'warn',
			'import/max-dependencies': [
				'error',
				{
					max: 30,
					ignoreTypeImports: true,
				},
			],
			'import/newline-after-import': 'warn',
			'import/no-duplicates': 'warn',
			'import/no-named-default': 'error',
			'import/no-namespace': 'warn',

			'import/no-extraneous-dependencies': 'off',
			'import/no-anonymous-default-export': 'off',
			'import/exports-last': 'off',
			'import/no-unassigned-import': 'off',
			'import/no-relative-parent-imports': 'off',
			'import/unambiguous': 'off',
			'import/prefer-default-export': 'off',
			'import/group-exports': 'off',
			'import/order': 'off',
			'import/extensions': 'off',
			'import/no-named-export': 'off',
			'import/named': 'off',
			'import/no-internal-modules': 'off',
			'import/no-unresolved': 'off',
			'import/no-default-export': 'off',
		},
	},
	{
		rules: {
			'@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
			'unused-imports/no-unused-imports': 'error',
		},
	},
	{
		rules: {
			'svelte/sort-attributes': 'warn',
		},
	},
	{
		ignores: ['build/', '.svelte-kit/', 'dist/', '.vercel/'],
	},
);
