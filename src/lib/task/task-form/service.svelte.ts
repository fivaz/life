import { convertToTaskIn, type TaskIn } from '$lib/task/task-in-utils';
import { buildTimedTask } from '$lib/task/build-utils';
import { buildEmptyCategory } from '../../../routes/(dashboard)/categories/category-form/service';

export const taskIn = $state<{ value: TaskIn }>({
	value: convertToTaskIn(buildTimedTask([buildEmptyCategory()])),
});
