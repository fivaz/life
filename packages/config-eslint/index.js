import { fileURLToPath } from 'node:url';

import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettier from 'eslint-config-prettier';
import turboConfig from 'eslint-config-turbo/flat';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';
import svelte from 'eslint-plugin-svelte';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import ts from 'typescript-eslint';

import svelteConfig from '../../apps/web/svelte.config.js';

const gitignorePath = fileURLToPath(new URL('../../.gitignore', import.meta.url));

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	globalIgnores(['!.storybook'], 'Include Storybook Directory'),
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs.recommended,
	prettier,
	...svelte.configs.prettier,
	...turboConfig,
	...storybook.configs['flat/recommended'],
	{
		languageOptions: { globals: { ...globals.browser, ...globals.node } },

		rules: {
			// typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
			// see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
			'no-undef': 'off',
		},
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],

		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser,
				svelteConfig,
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
		rules: {
			'simple-import-sort/imports': 'error',
			'simple-import-sort/exports': 'error',
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
		rules: {
			'svelte/no-navigation-without-resolve': [
				'error',
				{
					ignoreGoto: false,
					ignoreLinks: true,
					ignorePushState: false,
					ignoreReplaceState: false,
				},
			],
		},
	},
	{
		files: ['**/*.stories.svelte'],
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
		},
	},
);
