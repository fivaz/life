import { broom } from '@lucide/lab';
import Apple from '@lucide/svelte/icons/apple';
import Banknote from '@lucide/svelte/icons/banknote';
import Bed from '@lucide/svelte/icons/bed';
import BicepsFlexed from '@lucide/svelte/icons/biceps-flexed';
import BookOpenText from '@lucide/svelte/icons/book-open-check';
import Brain from '@lucide/svelte/icons/brain';
import Calendar1 from '@lucide/svelte/icons/calendar-1';
import Check from '@lucide/svelte/icons/check';
import Church from '@lucide/svelte/icons/church';
import Dumbbell from '@lucide/svelte/icons/dumbbell';
import Flame from '@lucide/svelte/icons/flame';
import Gem from '@lucide/svelte/icons/gem';
import GlassWater from '@lucide/svelte/icons/glass-water';
import Hammer from '@lucide/svelte/icons/hammer';
import HeartPulse from '@lucide/svelte/icons/heart-pulse';
import House from '@lucide/svelte/icons/House';
import Laptop from '@lucide/svelte/icons/Laptop';
import MessageCircle from '@lucide/svelte/icons/message-circle';
import NotebookPen from '@lucide/svelte/icons/notebook-pen';
import Pickaxe from '@lucide/svelte/icons/pickaxe';
import Shower from '@lucide/svelte/icons/shower-head';
import Sprout from '@lucide/svelte/icons/sprout';
import Device from '@lucide/svelte/icons/tablet-smartphone';
import Tablets from '@lucide/svelte/icons/tablets';
import Trophy from '@lucide/svelte/icons/trophy';
import TvMinimal from '@lucide/svelte/icons/tv-minimal';
import Utensils from '@lucide/svelte/icons/utensils-crossed';
import type { Component } from 'svelte';

export type IconHash =
	| { component: Component; name: string }
	| { iconNode: typeof broom; name: string };

const defaultIcon: IconHash = { component: Flame, name: 'Fire' };

export const icons: IconHash[] = [
	defaultIcon,
	{ component: Trophy, name: 'Trophy' },
	{ component: HeartPulse, name: 'Cardio Heart Exercise Gym' },
	{ component: Dumbbell, name: 'Weightlifting Barbell' },
	{ component: Banknote, name: 'Money' },
	{ component: BookOpenText, name: 'Book' },
	{ component: Sprout, name: 'Plant Nature' },
	{ component: Hammer, name: 'Hammer and Nail' },
	{ component: Check, name: 'Checkmark' },
	{ component: House, name: 'House' },
	{ component: Laptop, name: 'Computer/Laptop' },
	{ component: Utensils, name: 'Food Plate' },
	{ component: Bed, name: 'Bed' },
	{ component: Calendar1, name: 'CalendarCheck' },
	{ component: Device, name: 'Device Phone Tech' },
	{ component: Shower, name: 'Shower' },
	{ component: Tablets, name: 'Pills Medicine Health' },
	{ component: Pickaxe, name: 'Work' },
	{ component: TvMinimal, name: 'Tv' },
	{ component: GlassWater, name: 'Water' },
	{ component: NotebookPen, name: 'Pencil' },
	{ component: Church, name: 'Church' },
	{ component: BicepsFlexed, name: 'Appearance/Muscle/Body' },
	{ component: Gem, name: 'Gem' },
	{ component: Brain, name: 'Brain/Intelligence/Knowledge' },
	{ component: MessageCircle, name: 'Talk' },
	{ component: Apple, name: 'Apple Food' },
	{ iconNode: broom, name: 'Clean' },
];

export function getIcon(name: null | string) {
	const icon = icons.find((icon) => icon.name === name);

	return icon || defaultIcon;
}
