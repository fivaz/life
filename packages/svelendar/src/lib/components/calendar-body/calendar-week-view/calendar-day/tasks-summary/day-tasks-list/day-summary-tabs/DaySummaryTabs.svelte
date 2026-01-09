<script lang="ts">
	interface Props {
		activeTab: Tab;
	}

	type Tab = 'plan' | 'currently';

	const tabs = [
		{ id: 'plan', label: 'Plan' },
		{ id: 'currently', label: 'Currently' },
	];

	let { activeTab = $bindable() }: Props = $props();

	function handleTabClick(id: string, event: MouseEvent): void {
		event.preventDefault();
		activeTab = id as Tab;
	}
</script>

<div>
	<div class="grid grid-cols-1 sm:hidden">
		<select
			class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-gray-100 dark:outline-white/10 dark:*:bg-gray-800 dark:focus:outline-indigo-500"
			aria-label="Select a tab"
			bind:value={activeTab}
		>
			{#each tabs as tab (tab.id)}
				<option value={tab.id}>{tab.label}</option>
			{/each}
		</select>
		<svg
			class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500 dark:fill-gray-400"
			aria-hidden="true"
			fill="currentColor"
			viewBox="0 0 16 16"
		>
			<path
				clip-rule="evenodd"
				d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
				fill-rule="evenodd"
			/>
		</svg>
	</div>

	<div class="hidden sm:block">
		<div class="border-b border-gray-200 dark:border-white/10">
			<nav class="-mb-px flex" aria-label="Tabs">
				{#each tabs as tab (tab.id)}
					{@const isActive = activeTab === tab.id}
					<a
						class="flex-1 border-b-2 px-1 py-4 text-center text-sm font-medium transition-colors
            {isActive
							? 'border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
							: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-white/20 dark:hover:text-gray-300'}"
						aria-current={isActive ? 'page' : undefined}
						href="#{tab.id}"
						onclick={(e) => handleTabClick(tab.id, e)}
					>
						{tab.label}
					</a>
				{/each}
			</nav>
		</div>
	</div>
</div>
