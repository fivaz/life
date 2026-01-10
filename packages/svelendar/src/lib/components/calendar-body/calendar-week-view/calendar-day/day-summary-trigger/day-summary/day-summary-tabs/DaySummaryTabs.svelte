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
