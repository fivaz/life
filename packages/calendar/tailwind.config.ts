import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {},
	},
	safelist: [
		'bg-blue-500',
		'hover:bg-blue-300',
		'hover:bg-blue-100',
		'group-hover:text-blue-700',
		'bg-blue-50',
		'text-blue-500',
		'text-blue-700',
		'bg-green-500',
		'hover:bg-green-300',
		'hover:bg-green-100',
		'group-hover:text-green-700',
		'bg-green-50',
		'text-green-500',
		'text-green-700',
		'bg-lime-500',
		'hover:bg-lime-300',
		'hover:bg-lime-100',
		'group-hover:text-lime-700',
		'bg-lime-50',
		'text-lime-500',
		'text-lime-700',
		'bg-purple-500',
		'hover:bg-purple-300',
		'hover:bg-purple-100',
		'group-hover:text-purple-700',
		'bg-purple-50',
		'text-purple-500',
		'text-purple-700',
		'bg-red-500',
		'hover:bg-red-300',
		'hover:bg-red-100',
		'group-hover:text-red-700',
		'bg-red-50',
		'text-red-500',
		'text-red-700',
		'bg-yellow-500',
		'hover:bg-yellow-300',
		'hover:bg-yellow-100',
		'group-hover:text-yellow-700',
		'bg-yellow-50',
		'text-yellow-500',
		'text-yellow-700',
		'bg-pink-500',
		'hover:bg-pink-300',
		'hover:bg-pink-100',
		'group-hover:text-pink-700',
		'bg-pink-50',
		'text-pink-500',
		'text-pink-700',
		'bg-sky-500',
		'hover:bg-sky-300',
		'hover:bg-sky-100',
		'group-hover:text-sky-700',
		'bg-sky-50',
		'text-sky-500',
		'text-sky-700',
		'bg-cyan-500',
		'hover:bg-cyan-300',
		'hover:bg-cyan-100',
		'group-hover:text-cyan-700',
		'bg-cyan-50',
		'text-cyan-500',
		'text-cyan-700',
		'bg-teal-500',
		'hover:bg-teal-300',
		'hover:bg-teal-100',
		'group-hover:text-teal-700',
		'bg-teal-50',
		'text-teal-500',
		'text-teal-700',
		'bg-orange-500',
		'hover:bg-orange-300',
		'hover:bg-orange-100',
		'group-hover:text-orange-700',
		'bg-orange-50',
		'text-orange-500',
		'bg-rose-500',
		'hover:bg-rose-300',
		'hover:bg-rose-100',
		'group-hover:text-rose-700',
		'bg-rose-50',
		'text-rose-500',
		'text-rose-700',
	],
	plugins: [forms, containerQueries],
} satisfies Config;
