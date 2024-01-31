<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/button/Button.svelte';
	import { loginRoute, rootRoute } from '$lib/consts';
	import { auth, db } from '$lib/firebase';
	import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
	import type { AuthError } from 'firebase/auth';
	import { doc, setDoc } from 'firebase/firestore';
	import { minidenticon } from 'minidenticons';

	$: svgURI = 'data:image/svg+xml;utf8,' + encodeURIComponent(minidenticon(email, 95, 45));

	let isLoading: boolean = false;

	let displayName = '';
	let email = '';
	let password = '';
	let errorMessage: string | unknown = '';

	async function submit() {
		isLoading = true;
		try {
			const { user } = await createUserWithEmailAndPassword(auth, email, password);
			await updateProfile(user, { displayName });
			const userRef = doc(db, 'users', user.uid);
			await setDoc(userRef, {
				displayName,
				email,
			});

			void goto(rootRoute);
		} catch (error) {
			if ((error as AuthError).code === 'auth/invalid-credential') {
				errorMessage = 'login or password are incorrect';
			} else {
				errorMessage = error;
			}
		}
		isLoading = false;
	}
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
			<form class="space-y-6" method="POST" on:submit|preventDefault={submit}>
				{#if email}
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
							bind:value={displayName}
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>
				<div>
					<label for="email" class="block text-sm font-medium leading-6 text-gray-900">
						Email address
					</label>
					<div class="mt-2">
						<input
							id="email"
							name="email"
							type="email"
							autocomplete="email"
							required
							bind:value={email}
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
							bind:value={password}
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

				<div>
					<Button {isLoading} type="submit" class="w-full leading-6">Register</Button>
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
