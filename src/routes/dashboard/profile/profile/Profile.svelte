<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import { applyAction, enhance } from '$app/forms';
	import Alert from '$lib/components/alert/Alert.svelte';
	import type { ActionData } from '../../../../../.svelte-kit/types/src/routes/dashboard/profile/$types';

	let file: File | undefined = undefined;

	export let user: { avatar: string; name: string; username: string };

	export let form: ActionData;

	function handleChange(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		if (event.currentTarget.files) {
			file = event.currentTarget.files[0];
			user.avatar = URL.createObjectURL(file);
		}
	}

	const submit: SubmitFunction = () => {
		return async ({ result }) => {
			await applyAction(result);
		};
	};
</script>

<div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-md">
		<h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
			Profile
		</h2>
	</div>
	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
		<Alert
			type="success"
			isVisible={!!form?.success}
			on:close={() => (form ? (form.success = false) : null)}
		>
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
						<img class="inline-block h-12 w-12" src={user.avatar} alt="Your avatar" />
						<label
							class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
						>
							<input
								type="file"
								name="avatar"
								class="hidden"
								accept="image/*"
								on:change={handleChange}
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
							value={user.name}
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
							value={user.username}
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
