import type { Goal } from '@life/shared/goal';

export interface HierarchicalGoal extends Goal {
	children: HierarchicalGoal[];
}

export function buildGoalHierarchy(goals: Goal[]): HierarchicalGoal[] {
	// Create a map for quick lookup of goals by their id
	const goalMap = new Map<string, HierarchicalGoal>();

	// First pass: create HierarchicalItems for all goals
	goals.forEach((goal) => {
		goalMap.set(goal.id, {
			...goal,
			children: [],
		});
	});

	// Second pass: build the hierarchy
	const rootGoals: HierarchicalGoal[] = [];

	goals.forEach((goal) => {
		const hierarchicalGoal = goalMap.get(goal.id)!;

		if (!goal.parent) {
			// This is a root goal
			rootGoals.push(hierarchicalGoal);
		} else {
			// This goal has a parent
			const parent = goalMap.get(goal.parent);
			if (parent) {
				parent.children.push(hierarchicalGoal);
			} else {
				// Handle case where parent doesn't exist - add as root
				console.warn(`Parent with id ${goal.parent} not found for item ${goal.id}`);
				rootGoals.push(hierarchicalGoal);
			}
		}
	});

	return rootGoals;
}
