<script lang="ts">
	import { Button } from '@life/shared';
	import { minidenticon } from 'minidenticons';

	import { goto } from '$app/navigation';
	import Alert from '$lib/components/form/alert/Alert.svelte';
	import GithubIcon from '$lib/components/icons/GithubIcon.svelte';
	import GoogleIcon from '$lib/components/icons/GoogleIcon.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import { Routes } from '$lib/consts';
	import { githubSignIn, googleSignIn, isLoading } from '$lib/user/sign-in.utils.svelte';

	import { parseErrors, register, validateFields } from './service';

	let isDisabled = $derived(isLoading.email || isLoading.google || isLoading.github);

	let name = $state<string>('');
	let email = $state<string>('');
	let password = $state<string>('');

	let errorMessage = $state<string>('');

	let avatar = $derived(minidenticon(email, 95, 45));

	let photoURL = $derived('data:image/svg+xml;utf8,' + encodeURIComponent(avatar));

	async function onSubmit(event: SubmitEvent) {
		event.preventDefault();
		errorMessage = validateFields(email, password);
		if (errorMessage) {
			return;
		}

		try {
			isLoading.email = true;
			await register(name, email, password, avatar);
			void goto(Routes.ROOT);
		} catch (error) {
			errorMessage = parseErrors(error);
		} finally {
			isLoading.email = false;
		}
	}
</script>

<div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-md">
		<Logo class="m-auto h-10 w-auto text-indigo-600" />
		<h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
			Create your account
		</h2>
	</div>

	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
		<Alert class="mb-3" close={() => (errorMessage = '')} isVisible={!!errorMessage} type="error">
			{errorMessage}
		</Alert>

		<div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
			<form class="space-y-6" onsubmit={onSubmit}>
				{#if email}
					<div class="flex flex-col justify-center">
						<h3 class="block text-center text-sm font-medium leading-6 text-gray-900">
							Your Avatar
						</h3>
						<img class="h-10 w-auto" alt="your avatar" src={photoURL} />
					</div>
				{/if}
				<div>
					<label class="block text-sm font-medium leading-6 text-gray-900" for="name">
						Full name
					</label>
					<div class="mt-2">
						<input
							id="name"
							name="displayName"
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							type="text"
							bind:value={name}
						/>
					</div>
				</div>
				<div>
					<label class="block text-sm font-medium leading-6 text-gray-900" for="email">
						Email address
					</label>
					<div class="mt-2">
						<input
							id="email"
							name="email"
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							autocomplete="email"
							type="email"
							bind:value={email}
						/>
					</div>
				</div>

				<div>
					<label class="block text-sm font-medium leading-6 text-gray-900" for="password">
						Password
					</label>
					<div class="mt-2">
						<input
							id="password"
							name="password"
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							autocomplete="current-password"
							type="password"
							bind:value={password}
						/>
					</div>
				</div>

				<div>
					<Button
						class="w-full leading-6"
						disabled={isDisabled}
						isLoading={isLoading.email}
						type="submit"
					>
						Register
					</Button>
				</div>
			</form>

			<div>
				<div class="relative mt-10">
					<div class="absolute inset-0 flex items-center" aria-hidden="true">
						<div class="w-full border-t border-gray-200"></div>
					</div>
					<div class="relative flex justify-center text-sm/6 font-medium">
						<span class="bg-white px-6 text-gray-900">Or continue with</span>
					</div>
				</div>

				<div class="mt-6 grid grid-cols-2 gap-4">
					<Button
						class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
						color="none"
						disabled={isDisabled}
						isLoading={isLoading.google}
						onclick={googleSignIn}
						type="button"
					>
						<GoogleIcon />
						<span class="text-sm/6 font-semibold">Google</span>
					</Button>

					<Button
						class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
						color="none"
						disabled={isDisabled}
						isLoading={isLoading.github}
						onclick={githubSignIn}
						type="button"
					>
						<GithubIcon />
						<span class="text-sm/6 font-semibold">GitHub</span>
					</Button>
				</div>
			</div>
		</div>

		<p class="mt-10 text-center text-sm text-gray-500">
			Already a member?
			{' '}
			<a class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" href={Routes.LOGIN}>
				Log in
			</a>
		</p>
	</div>
</div>
