<script lang="ts">
	import { Dialog, TransitionChild, TransitionRoot } from '@rgossiaux/svelte-headlessui';
	import { Bars3, Calendar, DocumentDuplicate, XMark } from '@steeze-ui/heroicons';
	import { List, Target } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { page } from '$app/stores';
	import ProfileDropDown from '$lib/components/dashboard/profile-drop-down/ProfileDropDown.svelte';
	import ProfileDropUp from '$lib/components/dashboard/profile-drop-up/ProfileDropUp.svelte';
	import { categoriesRoute, homeRoute, tasksRoute, toGoalsRoute } from '$lib/consts';
	import classnames from 'classnames';
	import { SignedIn } from 'sveltefire';

	const navigation = [
		{ name: 'Calendar', href: homeRoute, icon: Calendar },
		{ name: 'Categories', href: categoriesRoute, icon: DocumentDuplicate },
		{ name: 'Tasks', href: tasksRoute, icon: List },
		{ name: 'Goals', href: toGoalsRoute, icon: Target },
	];

	let sidebarOpen = false;
</script>

<SignedIn let:user>
	<div>
		<!--    use svelte animations instead of transition-->
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
						<div class="relative mr-16 flex w-full h-full max-w-xs flex-1">
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
									<button type="button" class="-m-2.5 p-2.5" on:click={() => (sidebarOpen = false)}>
										<span class="sr-only">Close sidebar</span>
										<Icon src={XMark} class="h-6 w-6 text-white" aria-hidden="true" />
									</button>
								</div>
							</TransitionChild>
							<!-- Sidebar component, swap this element with another sidebar if you like -->
							<div class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
								<div class="flex h-16 shrink-0 items-center">
									<img
										class="h-8 w-auto"
										src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
										alt="Your Company"
									/>
								</div>
								<nav class="flex flex-1 flex-col">
									<ul role="list" class="flex flex-1 flex-col gap-y-7">
										<li>
											<ul role="list" class="-mx-2 space-y-1">
												{#each navigation as item (item.name)}
													<li>
														<a
															href={item.href}
															class={classnames(
																$page.url.pathname === item.href
																	? 'bg-gray-50 text-indigo-600'
																	: 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
																'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
															)}
														>
															<Icon
																src={item.icon}
																class={classnames(
																	$page.url.pathname === item.href
																		? 'text-indigo-600'
																		: 'text-gray-400 group-hover:text-indigo-600',
																	'h-6 w-6 shrink-0',
																)}
																aria-hidden="true"
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

		<!-- Static sidebar for desktop -->
		<div class="hidden lg:fixed lg:inset-y-0 lg:z-20 lg:flex lg:w-72 lg:flex-col">
			<!-- Sidebar component, swap this element with another sidebar if you like -->
			<div
				class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6"
			>
				<div class="flex h-16 shrink-0 items-center">
					<img
						class="h-8 w-auto"
						src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
						alt="Your Company"
					/>
				</div>
				<nav class="flex flex-1 flex-col">
					<ul role="list" class="flex flex-1 flex-col gap-y-7">
						<li>
							<ul role="list" class="-mx-2 space-y-1">
								{#each navigation as item (item.name)}
									<li>
										<a
											href={item.href}
											class={classnames(
												$page.url.pathname === item.href
													? 'bg-gray-50 text-indigo-600'
													: 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
												'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
											)}
										>
											<Icon
												src={item.icon}
												class={classnames(
													$page.url.pathname === item.href
														? 'text-indigo-600'
														: 'text-gray-400 group-hover:text-indigo-600',
													'h-6 w-6 shrink-0',
												)}
												aria-hidden="true"
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
									<img class="h-8 w-8 rounded-full bg-gray-50" src={user.photoURL} alt="avatar" />
									<span class="sr-only">Your profile</span>
									<span aria-hidden="true">{user.displayName}</span>
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
				type="button"
				class="-m-2.5 p-2.5 text-gray-700 lg:hidden"
				on:click={() => (sidebarOpen = true)}
			>
				<span class="sr-only">Open sidebar</span>
				<Icon src={Bars3} theme="solid" class="h-6 w-6" aria-hidden="true" />
			</button>
			<div class="flex-1 text-sm font-semibold leading-6 text-gray-900">Dashboard</div>

			<ProfileDropDown>
				<div>
					<span class="sr-only">Your profile</span>
					<img class="h-8 w-8 rounded-full bg-gray-50" src={user.photoURL} alt="avatar" />
				</div>
			</ProfileDropDown>
		</div>

		<main class="py-10 lg:pl-72">
			<div class="px-4 sm:px-6 lg:px-8">
				<slot />
			</div>
		</main>
	</div>
</SignedIn>
