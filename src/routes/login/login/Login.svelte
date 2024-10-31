<script lang="ts">
	import { goto } from '$app/navigation';
	import Logo from '$lib/components/Logo.svelte';
	import Alert from '$lib/components/form/alert/Alert.svelte';
	import Button from '$lib/components/form/button/Button.svelte';
	import { Routes } from '$lib/consts';
	import { auth } from '$lib/firebase';
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { parseErrors, validateFields } from './service';

	let isLoading = $state<boolean>(false);

	let errorMessage = $state<string>('');

	let email = $state<string>('');
	let password = $state<string>('');

	async function onSubmit(event: SubmitEvent) {
		event.preventDefault();
		errorMessage = validateFields(email, password);
		if (errorMessage) {
			return;
		}

		try {
			isLoading = true;
			await signInWithEmailAndPassword(auth, email, password);
			void goto(Routes.HOME);
		} catch (error) {
			errorMessage = parseErrors(error);
		} finally {
			isLoading = false;
		}
	}
</script>

<!--the input names email and password as well as the submit type of the button are selectors used in the test-->
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
					<a class="font-semibold text-indigo-600 hover:text-indigo-500" href={Routes.REGISTER}>
						Register
					</a>
				</p>
			</div>

			<div class="mt-5">
				<Alert isVisible={!!errorMessage} close={() => (errorMessage = '')} type="error">
					{errorMessage}
				</Alert>
				<div class="mt-5">
					<form class="space-y-6" onsubmit={onSubmit}>
						<div>
							<label class="block text-sm font-medium leading-6 text-gray-900">
								Email address

								<input
									autocomplete="email"
									class="mt-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									name="email"
									type="email"
									bind:value={email}
								/>
							</label>
						</div>

						<div>
							<label class="block text-sm font-medium leading-6 text-gray-900">
								Password
								<input
									autocomplete="current-password"
									class="mt-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									name="password"
									type="password"
									bind:value={password}
								/>
							</label>
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
