import type { Goal } from '@prisma/client';

export type GGoal = Omit<Goal, 'userId' | 'deleted'>;
