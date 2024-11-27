import {
	ArrowUp,
	Bed,
	Bullseye,
	Calendar,
	Camera,
	Car,
	CartShopping,
	Check,
	Chess,
	Compass,
	Cross,
	Dumbbell,
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
	MoneyBill1Wave,
	Mountain,
	Music,
	Paintbrush,
	PersonRunning,
	Pills,
	Plane,
	PuzzlePiece,
	Road,
	Rocket,
	Searchengin,
	Seedling,
	Shield,
	Shower,
	Stopwatch,
	Sun,
	Toolbox,
	Tree,
	Trophy,
	Tv,
	Utensils
} from '@steeze-ui/font-awesome';
import {
	BookOpenText,
	BriefcaseBusiness,
	CalendarCheck,
	GlassWater,
	PencilLine,
	Smartphone
} from '@steeze-ui/lucide-icons';
import type { IconSource } from '@steeze-ui/svelte-icon';

const defaultIcon: GoalIconType = { component: Fire, name: 'Fire' };

export type GoalIconType = {
	component: IconSource;
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
	{ component: MoneyBill1Wave, name: 'Money' },
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
	{ component: Car, name: 'Car' },
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
	{ component: PencilLine, name: 'Pencil' }
];

export function getIcon(name: null | string) {
	const icon = icons.find((icon) => icon.name === name);

	return icon || defaultIcon;
}
