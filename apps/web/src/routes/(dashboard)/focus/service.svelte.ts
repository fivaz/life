import { getCurrentRoundedDate, getNextRoundedTime } from '@life/shared/date';

export const defaultTime = 30 * 60;

export const timer = $state<{
	interval: NodeJS.Timeout | null;
	status: 'stopped' | 'paused' | 'running';
	value: number;
}>({
	interval: null,
	status: 'stopped',
	value: defaultTime,
});

export function startTimer(): void {
	if (timer.interval) {
		clearInterval(timer.interval);
	}
	timer.status = 'running';
	timer.interval = setInterval(() => {
		if (timer.value > 0) {
			timer.value -= 1;
		} else {
			endTimer();
		}
	}, 1000);
}

export function pauseTimer(): void {
	if (timer.interval) {
		timer.status = 'paused';
		clearInterval(timer.interval);
		timer.interval = null;
	}
}

export function endTimer(): void {
	pauseTimer();
	timer.status = 'stopped';
	timer.value = defaultTime;
}
