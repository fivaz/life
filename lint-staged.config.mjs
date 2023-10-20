export default {
  "**/*.ts?(x)": () => "tsc -p tsconfig.json --noEmit",
  "**/*.{js,jsx,json,ts,tsx,svelte}": ["pnpm run lint . --fix"],
};
