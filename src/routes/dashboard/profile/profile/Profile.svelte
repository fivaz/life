<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import { applyAction, enhance } from '$app/forms';
	import Alert from '$lib/components/alert/Alert.svelte';
	import { SignedIn } from 'sveltefire';

	let file: File | undefined = undefined;

	let success: boolean = false;

	function handleChange(
		event: Event & { currentTarget: EventTarget & HTMLInputElement },
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		user: any,
	) {
		if (event.currentTarget.files) {
			file = event.currentTarget.files[0];
			user.photoURL = URL.createObjectURL(file);
		}
	}

	const submit: SubmitFunction = () => {
		return async ({ result }) => {
			await applyAction(result);
		};
	};
</script>

<SignedIn let:user>
	<div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
		<div class="sm:mx-auto sm:w-full sm:max-w-md">
			<h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
				Profile
			</h2>
		</div>
		<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
			<Alert type="success" isVisible={!!success} on:close={() => (success = false)}>
				Profile successfully edited
			</Alert>
			<div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
				<form
					class="space-y-6"
					method="POST"
					action="?/save"
					enctype="multipart/form-data"
					use:enhance={submit}
				>
					<div class="col-span-full">
						<h3 class="block text-sm font-medium leading-6 text-gray-900">Avatar</h3>
						<div class="mt-2 flex items-center gap-x-3">
							<img class="inline-block h-12 w-12" src={user.photoURL} alt="Your avatar" />
							<label
								class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
							>
								<input
									type="file"
									name="avatar"
									class="hidden"
									accept="image/*"
									on:change={(e) => handleChange(e, user)}
								/>
								Change
							</label>
						</div>
					</div>

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
								value={user.displayName}
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
								required
								value={user.email}
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
								class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<button
							type="submit"
							class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Edit profile
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</SignedIn>
