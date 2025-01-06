export const defaultTime = 30 * 60;

export const timer = $state<{ status: 'stopped' | 'paused' | 'running'; value: number }>({
	status: 'stopped',
	value: defaultTime,
});
