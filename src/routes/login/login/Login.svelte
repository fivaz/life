<script lang="ts">
	import { signInWithEmailAndPassword } from 'firebase/auth';

	import { goto } from '$app/navigation';
	import { errorMessage, githubSignIn, googleSignIn, isLoading } from '$lib/auth/sign-in.svelte';
	import Alert from '$lib/components/form/alert/Alert.svelte';
	import Button from '$lib/components/form/button/Button.svelte';
	import GithubIcon from '$lib/components/icons/GithubIcon.svelte';
	import GoogleIcon from '$lib/components/icons/GoogleIcon.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import { Routes } from '$lib/consts';
	import { auth } from '$lib/firebase';

	import { parseErrors, validateFields } from './service';

	let isDisabled = $derived(isLoading.email || isLoading.google || isLoading.github);

	let email = $state<string>('');
	let password = $state<string>('');

	async function onSubmit(event: SubmitEvent) {
		event.preventDefault();
		errorMessage.value = validateFields(email, password);
		if (errorMessage.value) {
			return;
		}

		try {
			isLoading.email = true;
			await signInWithEmailAndPassword(auth, email, password);
			void goto(Routes.ROOT);
		} catch (error) {
			errorMessage.value = parseErrors(error);
		} finally {
			isLoading.email = false;
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
				<Alert
					isVisible={!!errorMessage.value}
					close={() => (errorMessage.value = '')}
					type="error"
				>
					{errorMessage.value}
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
							<Button
								disabled={isDisabled}
								class="w-full leading-6"
								isLoading={isLoading.email}
								type="submit"
							>
								Sign in
							</Button>
						</div>
					</form>
				</div>
			</div>

			<div class="mt-10">
				<div class="relative">
					<div class="absolute inset-0 flex items-center" aria-hidden="true">
						<div class="w-full border-t border-gray-200"></div>
					</div>
					<div class="relative flex justify-center text-sm/6 font-medium">
						<span class="bg-white px-6 text-gray-900">Or continue with</span>
					</div>
				</div>

				<div class="mt-6 grid grid-cols-2 gap-4">
					<Button
						type="button"
						color="none"
						onclick={googleSignIn}
						isLoading={isLoading.google}
						disabled={isDisabled}
						class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
					>
						<GoogleIcon />
						<span class="text-sm/6 font-semibold">Google</span>
					</Button>

					<Button
						type="button"
						color="none"
						isLoading={isLoading.github}
						disabled={isDisabled}
						onclick={githubSignIn}
						class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
					>
						<GithubIcon />
						<span class="text-sm/6 font-semibold">GitHub</span>
					</Button>
				</div>
			</div>
		</div>
	</div>

	<div class="relative hidden w-0 flex-1 lg:block">
		<img alt="" class="absolute inset-0 h-full w-full object-cover" src="/login.avif" />
	</div>
</div>
