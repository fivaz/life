import type { EEvent } from "$lib/event/utils";
import { writable } from "svelte/store";

export const events = writable<EEvent[]>([]);

export function updateEvent(newEvent: EEvent) {
  events.update(($events) => {
    const index = $events.findIndex((event) => event.id === newEvent.id);
    if (index !== -1) {
      // Update existing event
      return $events.map((event) =>
        event.id === newEvent.id ? newEvent : event
      );
    } else {
      // Add new event
      return [...$events, newEvent];
    }
  });
}

export function removeEvent(event: EEvent) {
  events.update(($events) =>
    $events.filter((existingEvent) => existingEvent.id !== event.id)
  );
}
export function toggleEvent(event: EEvent) {
  events.update(($events) => [
    ...$events.filter((existingEvent) => existingEvent.id !== event.id),
    { ...event, isDone: !event.isDone },
  ]);
}
