export const defaultTime = 30 * 60;

export const timer = $state<{
	interval: number | null;
	status: 'stopped' | 'paused' | 'running';
	value: number;
}>({
	interval: null,
	status: 'stopped',
	value: defaultTime,
});
