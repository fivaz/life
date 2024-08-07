<script lang="ts">
	import { page } from '$app/stores';
	import { currentUser } from '$lib/auth/store';
	import Logo from '$lib/components/Logo.svelte';
	import Banner from '$lib/components/banner/Banner.svelte';
	import ProfileDropDown from '$lib/components/dashboard/profile-drop-down/ProfileDropDown.svelte';
	import ProfileDropUp from '$lib/components/dashboard/profile-drop-up/ProfileDropUp.svelte';
	import { Routes, demoLogin } from '$lib/consts';
	import { auth } from '$lib/firebase';
	import { Dialog, TransitionChild, TransitionRoot } from '@rgossiaux/svelte-headlessui';
	import { Bars3, XMark } from '@steeze-ui/heroicons';
	import { CalendarDays, CandlestickChart, Goal, ListChecks, Tags } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { clsx } from 'clsx';
	import { onAuthStateChanged } from 'firebase/auth';
	import { onMount } from 'svelte';

	const navigation = [
		{ href: Routes.HOME, icon: CalendarDays, name: 'Calendar' },
		{ href: Routes.CATEGORIES, icon: Tags, name: 'Categories' },
		{ href: Routes.TASKS, icon: ListChecks, name: 'Tasks' },
		{ href: Routes.GOALS, icon: Goal, name: 'Goals' },
		{ href: Routes.REPORT, icon: CandlestickChart, name: 'Report' },
	];

	let sidebarOpen = false;

	onMount(() => {
		onAuthStateChanged(auth, (user) => {
			currentUser.set(user);
		});
	});
</script>

<div>
	<TransitionRoot show={sidebarOpen}>
		<Dialog class="relative z-20 lg:hidden" on:close={() => (sidebarOpen = false)}>
			<TransitionChild
				enter="transition-opacity ease-linear duration-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="transition-opacity ease-linear duration-300"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<div class="fixed inset-0 bg-gray-900/80" />
			</TransitionChild>

			<div class="fixed inset-0 flex">
				<TransitionChild
					enter="transition ease-in-out duration-300 transform"
					enterFrom="-translate-x-full"
					enterTo="translate-x-0"
					leave="transition ease-in-out duration-300 transform"
					leaveFrom="translate-x-0"
					leaveTo="-translate-x-full"
				>
					<div class="relative mr-16 flex h-full w-full max-w-xs flex-1">
						<TransitionChild
							as="div"
							enter="ease-in-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in-out duration-300"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<div class="absolute left-full top-0 flex w-16 justify-center pt-5">
								<button class="-m-2.5 p-2.5" on:click={() => (sidebarOpen = false)} type="button">
									<span class="sr-only">Close sidebar</span>
									<Icon aria-hidden="true" class="h-6 w-6 text-white" src={XMark} />
								</button>
							</div>
						</TransitionChild>
						<!-- Sidebar component, swap this element with another sidebar if you like -->
						<div class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
							<div class="flex h-16 shrink-0 items-center">
								<Logo class="h-8 w-auto text-indigo-600" />
							</div>
							<nav class="flex flex-1 flex-col">
								<ul class="flex flex-1 flex-col gap-y-7" role="list">
									<li>
										<ul class="-mx-2 space-y-1" role="list">
											{#each navigation as item (item.name)}
												<li>
													<a
														class={clsx(
															$page.url.pathname === item.href
																? 'bg-gray-50 text-indigo-600'
																: 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
															'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
														)}
														href={item.href}
													>
														<Icon
															aria-hidden="true"
															class={clsx(
																$page.url.pathname === item.href
																	? 'text-indigo-600'
																	: 'text-gray-400 group-hover:text-indigo-600',
																'h-6 w-6 shrink-0',
															)}
															src={item.icon}
														/>
														{item.name}
													</a>
												</li>
											{/each}
										</ul>
									</li>
								</ul>
							</nav>
						</div>
					</div>
				</TransitionChild>
			</div>
		</Dialog>
	</TransitionRoot>

	{#if $currentUser?.email === demoLogin.email}
		<Banner />
	{/if}
	<!-- Static sidebar for desktop -->
	<div class="hidden lg:fixed lg:inset-y-0 lg:z-20 lg:flex lg:w-72 lg:flex-col">
		<!-- Sidebar component, swap this element with another sidebar if you like -->
		<div class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
			<div class="flex h-16 shrink-0 items-center">
				<Logo class="h-8 w-auto text-indigo-600" />
			</div>
			<nav class="flex flex-1 flex-col">
				<ul class="flex flex-1 flex-col gap-y-7" role="list">
					<li>
						<ul class="-mx-2 space-y-1" role="list">
							{#each navigation as item (item.name)}
								<li>
									<a
										class={clsx(
											$page.url.pathname === item.href
												? 'bg-gray-50 text-indigo-600'
												: 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
											'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
										)}
										href={item.href}
									>
										<Icon
											aria-hidden="true"
											class={clsx(
												$page.url.pathname === item.href
													? 'text-indigo-600'
													: 'text-gray-400 group-hover:text-indigo-600',
												'h-6 w-6 shrink-0',
											)}
											src={item.icon}
										/>
										{item.name}
									</a>
								</li>
							{/each}
						</ul>
					</li>
					<li class="-mx-6 mt-auto">
						<ProfileDropUp>
							<div
								class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
							>
								<img
									alt="avatar"
									class="h-8 w-8 rounded-full bg-gray-50"
									src={$currentUser?.photoURL}
								/>
								<span class="sr-only">Your profile</span>
								<span aria-hidden="true">{$currentUser?.displayName}</span>
							</div>
						</ProfileDropUp>
					</li>
				</ul>
			</nav>
		</div>
	</div>

	<div
		class="sticky top-0 z-10 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden"
	>
		<button
			class="-m-2.5 p-2.5 text-gray-700 lg:hidden"
			on:click={() => (sidebarOpen = true)}
			type="button"
		>
			<span class="sr-only">Open sidebar</span>
			<Icon aria-hidden="true" class="h-6 w-6" src={Bars3} theme="solid" />
		</button>
		<div class="flex-1 text-sm font-semibold leading-6 text-gray-900">Dashboard</div>

		<ProfileDropDown>
			<div>
				<span class="sr-only">Your profile</span>
				<img alt="avatar" class="h-8 w-8 rounded-full bg-gray-50" src={$currentUser?.photoURL} />
			</div>
		</ProfileDropDown>
	</div>

	<main class="md:pb-5 lg:pl-72">
		<div class="px-4 sm:px-6 lg:px-8">
			<slot />
		</div>
	</main>
</div>
