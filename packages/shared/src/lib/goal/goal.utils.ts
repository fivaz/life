import {
	ArrowUp,
	Baby,
	Bed,
	BookBible,
	Bullseye,
	Calendar,
	Camera,
	CartShopping,
	Check,
	Chess,
	Comments,
	Compass,
	Cross,
	Dumbbell,
	FaceGrinHearts,
	Fire,
	Globe,
	GraduationCap,
	Hammer,
	Handshake,
	Heart,
	House,
	Key,
	Laptop,
	Lightbulb,
	Mountain,
	Music,
	Paintbrush,
	PersonCane,
	PersonRifle,
	PersonRunning,
	Pills,
	PuzzlePiece,
	Road,
	Rocket,
	Searchengin,
	Seedling,
	Shield,
	Shower,
	Signature,
	Stopwatch,
	Sun,
	Toolbox,
	Tree,
	Trophy,
	Tv,
	Utensils,
} from '@steeze-ui/font-awesome';
import {
	Banknote,
	Beer,
	BicepsFlexed,
	BookOpenText,
	Brain,
	BriefcaseBusiness,
	CalendarCheck,
	Car,
	Church,
	Croissant,
	Gem,
	GlassWater,
	MicVocal,
	PencilLine,
	PiggyBank,
	Plane,
	Smartphone,
} from '@steeze-ui/lucide-icons';
import type { IconSource } from '@steeze-ui/svelte-icon';
import type { Component } from 'svelte';

import CleanIcon from '$lib/components/goal-icon/icons/CleanIcon.svelte';
import type { Goal } from '$lib/goal/goal.model.js';

const defaultIcon: GoalIconType = { component: Fire, name: 'Fire' };

export type GoalIconType = {
	component: IconSource;
	directComponent?: Component;
	name: string;
	theme?: string | undefined;
};
export const icons: GoalIconType[] = [
	defaultIcon,
	{ component: Bullseye, name: 'Bullseye/Target' },
	{ component: Trophy, name: 'Trophy' },
	{ component: Mountain, name: 'Mountain Peak' },
	{ component: Rocket, name: 'Rocket Ship' },
	{ component: GraduationCap, name: 'Graduation Cap' },
	{ component: PersonRunning, name: 'Running Shoe' },
	{ component: Dumbbell, name: 'Weightlifting Barbell' },
	{ component: Paintbrush, name: 'Paintbrush' },
	{ component: Banknote, name: 'Money' },
	{ component: BookOpenText, name: 'Book' },
	{ component: Stopwatch, name: 'Stopwatch' },
	{ component: Lightbulb, name: 'Lightbulb', theme: 'default' },
	{ component: Seedling, name: 'Plant Sprout' },
	{ component: Handshake, name: 'Handshake', theme: 'default' },
	{ component: Key, name: 'Key' },
	{ component: Compass, name: 'Compass', theme: 'default' },
	{ component: Hammer, name: 'Hammer and Nail' },
	{ component: Shield, name: 'Shield' },
	{ component: Road, name: 'Road/Signpost' },
	{ component: Searchengin, name: 'Magnifying Glass', theme: 'default' },
	{ component: Check, name: 'Checkmark' },
	{ component: Calendar, name: 'Calendar', theme: 'default' },
	{ component: PuzzlePiece, name: 'Puzzle' },
	{ component: ArrowUp, name: 'Arrow Pointing Up' },
	{ component: Chess, name: 'Chess Piece' },
	{ component: House, name: 'House' },
	{ component: Tree, name: 'Tree' },
	{ component: Laptop, name: 'Computer/Laptop' },
	{ component: CartShopping, name: 'Shopping Cart' },
	{ component: Globe, name: 'Globe/World Map' },
	{ component: Heart, name: 'Heart', theme: 'default' },
	{ component: Music, name: 'Music Note' },
	{ component: Camera, name: 'Camera' },
	{ component: Utensils, name: 'Food Plate' },
	{ component: Plane, name: 'Airplane' },
	{ component: Sun, name: 'Sun', theme: 'default' },
	{ component: Key, name: 'Lock/Key' },
	{ component: Cross, name: 'Cross (Religion)' },
	{ component: Toolbox, name: 'Toolbox' },
	{ component: Bed, name: 'Bed' },
	{ component: CalendarCheck, name: 'CalendarCheck' },
	{ component: Smartphone, name: 'Smartphone' },
	{ component: Shower, name: 'Shower' },
	{ component: Pills, name: 'Pills' },
	{ component: BriefcaseBusiness, name: 'Work' },
	{ component: Tv, name: 'Tv' },
	{ component: GlassWater, name: 'Water' },
	{ component: PencilLine, name: 'Pencil' },
	{ component: Church, name: 'Church' },
	{ component: BicepsFlexed, name: 'Appearance/Muscle/Body' },
	{ component: MicVocal, name: 'Voice' },
	{ component: PiggyBank, name: 'Pig/Bank' },
	{ component: Gem, name: 'Gem' },
	{ component: Baby, name: 'Baby/Child' },
	{ component: Signature, name: 'Signature' },
	{ component: PersonCane, name: 'Old' },
	{ component: Brain, name: 'Brain/Intelligence/Knowledge' },
	{ component: Car, name: 'Car' },
	{ component: PersonRifle, name: 'Weapon' },
	{ component: FaceGrinHearts, name: 'Beauty' },
	{ component: BookBible, name: 'Bible' },
	{ component: Beer, name: 'Beer/Germany' },
	{ component: Croissant, name: 'Croissant/France' },
	{ component: Comments, name: 'Talk' },
	{ component: Bullseye, directComponent: CleanIcon, name: 'Clean' },
];

export function getIcon(name: null | string) {
	const icon = icons.find((icon) => icon.name === name);

	return icon || defaultIcon;
}

export function getGoalsForTasks(goals: Goal[]): Goal[] {
	const availableGoals = goals.filter((goal) => !goal.isDone);
	const smartGoals = availableGoals.filter((goal) => !!goal.deadline);
	return sortGoals(smartGoals);
}

export function sortGoals(goals: Goal[]) {
	return goals.toSorted((a, b) => {
		if (!a.deadline) return 1; // Place tasks with no deadline at the end
		if (!b.deadline) return -1;
		return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
	});
}
