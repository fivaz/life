import type { ToDo } from '@prisma/client';

export type TToDo = Omit<ToDo, 'userId' | 'deleted'>;
