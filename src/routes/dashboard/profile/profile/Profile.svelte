<script lang="ts">
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
</script>

<!--TODO implement this form submit later-->

<SignedIn let:user>
	<div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
		<div class="sm:mx-auto sm:w-full sm:max-w-md">
			<h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
				Profile
			</h2>
		</div>
		<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
			<Alert isVisible={!!success} on:close={() => (success = false)} type="success">
				Profile successfully edited
			</Alert>
			<div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
				<form action="?/save" class="space-y-6" enctype="multipart/form-data" method="POST">
					<div class="col-span-full">
						<h3 class="block text-sm font-medium leading-6 text-gray-900">Avatar</h3>
						<div class="mt-2 flex items-center gap-x-3">
							<img alt="Your avatar" class="inline-block h-12 w-12" src={user.photoURL} />
							<label
								class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
							>
								<input
									accept="image/*"
									class="hidden"
									name="avatar"
									on:change={(e) => handleChange(e, user)}
									type="file"
								/>
								Change
							</label>
						</div>
					</div>

					<div>
						<label class="block text-sm font-medium leading-6 text-gray-900" for="name">
							Full name
						</label>
						<div class="mt-2">
							<input
								class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								id="name"
								name="name"
								required
								type="text"
								value={user.displayName}
							/>
						</div>
					</div>
					<div>
						<label class="block text-sm font-medium leading-6 text-gray-900" for="username">
							Email address
						</label>
						<div class="mt-2">
							<input
								class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								id="username"
								name="username"
								required
								type="email"
								value={user.email}
							/>
						</div>
					</div>

					<div>
						<label class="block text-sm font-medium leading-6 text-gray-900" for="password">
							Password
						</label>
						<div class="mt-2">
							<input
								autocomplete="current-password"
								class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								id="password"
								name="password"
								type="password"
							/>
						</div>
					</div>

					<div>
						<button
							class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							type="submit"
						>
							Edit profile
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</SignedIn>
