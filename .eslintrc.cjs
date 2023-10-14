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
	plugins: ['@typescript-eslint', 'eslint-plugin-import-helpers', 'import', 'unused-imports'],
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
			}
		}
	],
	rules: {
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'import/no-unresolved': 'error',
		'import/imports-first': 'error',
		'import/export': 'error',
		'import/no-deprecated': 'error',
		'import/no-empty-named-blocks': 'error',
		'import/no-extraneous-dependencies': 'error',
		'import/no-named-as-default': 'error',
		'import/no-named-as-default-member': 'error',
		'import/no-unused-modules': 'error',
		'import/no-amd': 'error',
		'import/no-import-module-exports': 'error',
		'import/no-nodejs-modules': 'error',
		'import/default': 'error',
		'import/named': 'error',
		'import/namespace': 'error',
		'import/no-absolute-path': 'error',
		'import/no-cycle': 'error',
		'import/no-dynamic-require': 'error',
		'import/no-relative-packages': 'error',
		'import/no-restricted-paths': 'error',
		'import/no-self-import': 'error',
		'import/no-useless-path-segments': 'error',
		'import/no-webpack-loader-syntax': 'error',
		'import/consistent-type-specifier-style': 'error',
		'import/dynamic-import-chunkname': 'error',
		'import/extensions': 'error',
		'import/first': 'error',
		'import/max-dependencies': 'error',
		'import/newline-after-import': 'error',
		'import/no-duplicates': 'error',
		'import/no-named-default': 'error',
		'import/no-namespace': 'error',
		'import-helpers/order-imports': [
			'warn',
			{
				groups: ['module', '/^@shared/', ['parent', 'sibling', 'index']],
				alphabetize: { order: 'asc', ignoreCase: true }
			}
		],
		'unused-imports/no-unused-imports': 'warn',
		'unused-imports/no-unused-vars': [
			'off',
			{ vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' }
		]
	}
};

// in webstorm add --rule 'unused-imports/no-unused-imports: off' in Extra eslint options to avoid removing unused imports on save
