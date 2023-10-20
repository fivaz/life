import type { Event } from '@prisma/client';

export type EEvent = Omit<Event, 'deleted' | 'userId'>;
