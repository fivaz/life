<script lang="ts">
	import { goto } from '$app/navigation';
	import Logo from '$lib/components/Logo.svelte';
	import Alert from '$lib/components/alert/Alert.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import { homeRoute, registerRoute } from '$lib/consts';
	import { auth } from '$lib/firebase';
	import { validator } from '@felte/validator-yup';
	import { createForm } from 'felte';
	import { FirebaseError } from 'firebase/app';
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { object, string } from 'yup';

	let isLoading = false;

	let errorMessage: string | unknown = '';

	const schema = object({
		email: string().email().required(),
		password: string().required(),
	});

	const { errors, form } = createForm<{
		email: string;
		password: string;
	}>({
		extend: [validator({ schema })],
		onError: (error) => {
			if (error instanceof FirebaseError) {
				if (error.code === 'auth/invalid-credential') {
					errorMessage = 'login or password are incorrect';
				} else if (error.code === 'auth/network-request-failed') {
					errorMessage = "you can't login if you're not connected to the internet";
				} else {
					errorMessage = error.message;
				}
			} else {
				errorMessage = error;
			}
			isLoading = false;
		},
		onSubmit: async ({ email, password }) => {
			isLoading = true;
			await signInWithEmailAndPassword(auth, email, password);
			void goto(homeRoute);
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
				<Logo class="h-10 w-auto text-indigo-600" />
				<h2 class="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Sign in to your account
				</h2>
				<p class="mt-2 text-sm leading-6 text-gray-500">
					Not a member?{' '}
					<a class="font-semibold text-indigo-600 hover:text-indigo-500" href={registerRoute}>
						Register
					</a>
				</p>
			</div>

			<div class="mt-5">
				<Alert isVisible={!!errorMessage} on:close={() => (errorMessage = '')} type="error">
					{errorMessage}
				</Alert>
				<div class="mt-5">
					<form class="space-y-6" use:form>
						<div>
							<label class="block text-sm font-medium leading-6 text-gray-900" for="email">
								Email address
							</label>
							<div class="mt-2">
								<input
									autocomplete="email"
									class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									id="email"
									name="email"
									type="email"
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
									class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									id="password"
									name="password"
									type="password"
								/>
							</div>
						</div>

						<div class="flex items-center justify-between">
							<div class="flex items-center">
								<input
									class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
									disabled
									id="remember-me"
									name="remember-me"
									type="checkbox"
								/>
								<label class="ml-3 block text-sm leading-6 text-gray-700" for="remember-me">
									Remember me
								</label>
							</div>

							<div class="text-sm leading-6">
								<button class="font-semibold text-indigo-600 hover:text-indigo-500" disabled>
									Forgot password?
								</button>
							</div>
						</div>

						<div>
							<Button class="w-full leading-6" {isLoading} type="submit">Sign in</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
	<div class="relative hidden w-0 flex-1 lg:block">
		<img
			alt=""
			class="absolute inset-0 h-full w-full object-cover"
			src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
		/>
	</div>
</div>
