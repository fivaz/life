<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/button/Button.svelte';
	import { loginRoute } from '$lib/consts';
	import { minidenticon } from 'minidenticons';

	let username: string = '';
	$: svgURI = 'data:image/svg+xml;utf8,' + encodeURIComponent(minidenticon(username, 95, 45));

	let isLoading: boolean = false;
</script>

<!--TODO block the button submit so I can't submit the form twice-->
<div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-md">
		<img
			class="mx-auto h-10 w-auto"
			src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
			alt="Your Company"
		/>
		<h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
			Create your account
		</h2>
	</div>

	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
		<div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
			<form class="space-y-6" method="POST" use:enhance>
				{#if username}
					<div class="flex flex-col justify-center">
						<input type="hidden" name="avatar" value={svgURI} />
						<h3 class="text-center block text-sm font-medium leading-6 text-gray-900">
							Your Avatar
						</h3>
						<img class="h-10 w-auto" src={svgURI} alt="your avatar" />
					</div>
				{/if}
				<div>
					<label for="name" class="block text-sm font-medium leading-6 text-gray-900">
						Full name
					</label>
					<div class="mt-2">
						<input
							id="name"
							name="name"
							type="text"
							required
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>
				<div>
					<label for="username" class="block text-sm font-medium leading-6 text-gray-900">
						Email address
					</label>
					<div class="mt-2">
						<input
							id="username"
							name="username"
							type="email"
							autocomplete="username"
							required
							bind:value={username}
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

				<div>
					<label for="password" class="block text-sm font-medium leading-6 text-gray-900">
						Password
					</label>
					<div class="mt-2">
						<input
							id="password"
							name="password"
							type="password"
							autocomplete="current-password"
							required
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

				<div>
					<Button
						{isLoading}
						on:click={() => (isLoading = true)}
						type="submit"
						class="w-full leading-6"
					>
						Register
					</Button>
				</div>
			</form>
		</div>

		<p class="mt-10 text-center text-sm text-gray-500">
			Already a member?
			{' '}
			<a href={loginRoute} class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
				Log in
			</a>
		</p>
	</div>
</div>
