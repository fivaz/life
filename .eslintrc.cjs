module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'prettier',
		'plugin:storybook/recommended'
	],
	settings: {
		'import/resolver': {
			typescript: true,
			node: true
		},
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx']
		}
	},
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'import', 'eslint-plugin-import-helpers'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		},
		{
			files: ['*.svelte'],
			rules: {
				'svelte/valid-compile': 'warn'
				// '@typescript-eslint/no-unused-vars': 'warn'
			}
		}
	],
	rules: {
		// turn on errors for missing imports
		'import/no-unresolved': 'error',
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'import/imports-first': 'error',
		'import/order': 'error',
		'import/export': 'error',
		'import/no-deprecated': 'error',
		'import/no-empty-named-blocks': 'error',
		'import/no-extraneous-dependencies': 'error',
		'import/no-mutable-exports': 'off',
		'import/no-named-as-default': 'error',
		'import/no-named-as-default-member': 'error',
		'import/no-unused-modules': 'error',
		'import/no-amd': 'error',
		'import/no-commonjs': 'error',
		'import/no-import-module-exports': 'error',
		'import/no-nodejs-modules': 'error',
		'import/unambiguous': 'off',
		'import/default': 'error',
		'import/named': 'error',
		'import/namespace': 'error',
		'import/no-absolute-path': 'error',
		'import/no-cycle': 'error',
		'import/no-dynamic-require': 'error',
		'import/no-internal-modules': 'off',
		'import/no-relative-packages': 'error',
		'import/no-relative-parent-imports': 'off',
		'import/no-restricted-paths': 'error',
		'import/no-self-import': 'error',
		'import/no-useless-path-segments': 'error',
		'import/no-webpack-loader-syntax': 'error',
		'import/consistent-type-specifier-style': 'error',
		'import/dynamic-import-chunkname': 'error',
		'import/exports-last': 'off',
		'import/extensions': 'error',
		'import/first': 'error',
		'import/group-exports': 'off',
		'import/max-dependencies': 'error',
		'import/newline-after-import': 'error',
		'import/no-anonymous-default-export': 'off',
		'import/no-default-export': 'off',
		'import/no-duplicates': 'error',
		'import/no-named-default': 'error',
		'import/no-named-export': 'off',
		'import/no-namespace': 'error',
		'import/no-unassigned-import': 'off',
		'import/prefer-default-export': 'off',
		'import-helpers/order-imports': [
			'warn',
			{
				newlinesBetween: 'always', // new line between groups
				groups: ['module', '/^@shared/', ['parent', 'sibling', 'index']],
				alphabetize: { order: 'asc', ignoreCase: true }
			}
		]
	}
};
