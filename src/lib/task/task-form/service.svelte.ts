import { buildTimedTask } from '$lib/task/build-utils';
import { convertToTaskIn, type TaskIn } from '$lib/task/task-in-utils';

import { buildEmptyCategory } from '../../../routes/categories/category-form/service';

export const taskIn = $state<{ value: TaskIn }>({
	value: convertToTaskIn(buildTimedTask([buildEmptyCategory()])),
});
