export default {
	'**/*.{js,jsx,json,ts,tsx,svelte}': ['pnpm run format'],
	'**/*.ts?(x)': () => 'tsc -p tsconfig.json --noEmit',
};
