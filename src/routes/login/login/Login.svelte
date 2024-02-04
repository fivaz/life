<script lang="ts">
	import { validator } from '@felte/validator-yup';
	import { goto } from '$app/navigation';
	import Alert from '$lib/components/alert/Alert.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import { registerRoute, rootRoute } from '$lib/consts';
	import { auth } from '$lib/firebase';
	import { createForm } from 'felte';
	import { FirebaseError } from 'firebase/app';
	import {
		signInWithEmailAndPassword,
	} from 'firebase/auth';
	import { object, string } from 'yup';

	let isLoading: boolean = false;

	let errorMessage: string | unknown = '';

	const schema = object({
		email: string().email().required(),
		password: string().required(),
	});

	const { form, errors } = createForm<{
		email: string;
		password: string;
	}>({
		extend: [validator({ schema })],
		onSubmit: async ({ email, password }) => {
			isLoading = true;
			await signInWithEmailAndPassword(auth, email, password);
			void goto(rootRoute);
		},
		onError: (error) => {
			if (error instanceof FirebaseError) {
				if (error.code === 'auth/invalid-credential') {
					errorMessage = 'login or password are incorrect';
				}
				if (error.code === 'auth/network-request-failed') {
					errorMessage = "you can't login if you're not connected to the internet";
				} else {
					errorMessage = error.message;
				}
			} else {
				errorMessage = error;
			}
			isLoading = false;
		},
	});

	$: {
		errorMessage = Object.values($errors)
			.filter((value) => value)
			.join(', ');
	}
</script>

<div class="flex min-h-full flex-1">
	<div
		class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
	>
		<div class="mx-auto w-full max-w-sm lg:w-96">
			<div>
				<img
					class="h-10 w-auto"
					src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
					alt="Your Company"
				/>
				<h2 class="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Sign in to your account
				</h2>
				<p class="mt-2 text-sm leading-6 text-gray-500">
					Not a member?{' '}
					<a href={registerRoute} class="font-semibold text-indigo-600 hover:text-indigo-500">
						Register
					</a>
				</p>
			</div>

			<div class="mt-5">
				<Alert type="error" isVisible={!!errorMessage} on:close={() => (errorMessage = '')}>
					{errorMessage}
				</Alert>
				<div class="mt-5">
					<form class="space-y-6" use:form>
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
									class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
									class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div class="flex items-center justify-between">
							<div class="flex items-center">
								<input
									id="remember-me"
									name="remember-me"
									type="checkbox"
									disabled
									class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
								/>
								<label for="remember-me" class="ml-3 block text-sm leading-6 text-gray-700">
									Remember me
								</label>
							</div>

							<div class="text-sm leading-6">
								<button disabled class="font-semibold text-indigo-600 hover:text-indigo-500">
									Forgot password?
								</button>
							</div>
						</div>

						<div>
							<Button {isLoading} type="submit" class="w-full leading-6">Sign in</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
	<div class="relative hidden w-0 flex-1 lg:block">
		<img
			class="absolute inset-0 h-full w-full object-cover"
			src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
			alt=""
		/>
	</div>
</div>
