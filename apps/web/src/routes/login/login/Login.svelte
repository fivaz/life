<script lang="ts">
	import { Alert, Button, LInput, LText } from '@life/shared';
	import { signInWithEmailAndPassword } from 'firebase/auth';

	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import GithubIcon from '$lib/components/icons/GithubIcon.svelte';
	import GoogleIcon from '$lib/components/icons/GoogleIcon.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import { auth } from '$lib/firebase';
	import {
		errorMessage,
		githubSignIn,
		googleSignIn,
		isLoading,
	} from '$lib/user/sign-in.utils.svelte';

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
			void goto(resolve('/'));
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
				<Logo class="size-10 text-indigo-600" />
				<LText class="mt-8 text-2xl leading-9 font-bold tracking-tight" tag="h2">
					Sign in to your account
				</LText>
				<p class="mt-2 text-sm leading-6 text-gray-500">
					Not a member? <a
						class="font-semibold text-indigo-600 hover:text-indigo-500"
						href={resolve('/register')}
					>
						Register
					</a>
				</p>
			</div>

			<div class="mt-5">
				<Alert
					close={() => (errorMessage.value = '')}
					isVisible={!!errorMessage.value}
					type="error"
				>
					{errorMessage.value}
				</Alert>
				<div class="mt-5">
					<form class="space-y-6" onsubmit={onSubmit}>
						<LInput
							class="flex flex-col gap-3"
							autocomplete="email"
							inputClass="w-full"
							label="Email address"
							type="email"
							bind:value={email}
						/>

						<LInput
							class="flex flex-col gap-3"
							inputClass="w-full"
							label="Password"
							type="password"
							bind:value={password}
						/>

						<!--						<div class="flex items-center justify-between">-->
						<!--							<div class="flex items-center">-->
						<!--								<input-->
						<!--									id="remember-me"-->
						<!--									name="remember-me"-->
						<!--									class="size-4 rounded-sm border-gray-300 text-indigo-600 focus:ring-indigo-600"-->
						<!--									disabled-->
						<!--									type="checkbox"-->
						<!--								/>-->
						<!--								<label class="ml-3 block text-sm leading-6 text-gray-700" for="remember-me">-->
						<!--									Remember me-->
						<!--								</label>-->
						<!--							</div>-->

						<!--							<div class="text-sm leading-6">-->
						<!--								<button class="font-semibold text-indigo-600 hover:text-indigo-500" disabled>-->
						<!--									Forgot password?-->
						<!--								</button>-->
						<!--							</div>-->
						<!--						</div>-->

						<Button
							class="flex w-full justify-center leading-6"
							disabled={isDisabled}
							isLoading={isLoading.email}
							type="submit"
						>
							Sign in
						</Button>
					</form>
				</div>
			</div>

			<div class="mt-10">
				<div class="relative">
					<div class="absolute inset-0 flex items-center" aria-hidden="true">
						<div class="w-full border-t border-gray-200"></div>
					</div>
					<div class="relative flex justify-center text-sm/6 font-medium">
						<LText class="bg-white px-6 dark:bg-gray-800">Or continue with</LText>
					</div>
				</div>

				<div class="mt-6 grid grid-cols-2 gap-4">
					<Button
						class="flex justify-center"
						color="white"
						disabled={isDisabled}
						isLoading={isLoading.google}
						onclick={googleSignIn}
						type="button"
					>
						<GoogleIcon />
						<span class="text-sm/6 font-semibold">Google</span>
					</Button>

					<Button
						class="flex justify-center"
						color="white"
						disabled={isDisabled}
						isLoading={isLoading.github}
						onclick={githubSignIn}
						type="button"
					>
						<GithubIcon class="text-gray-900 dark:text-white" />
						<span class="text-sm/6 font-semibold">GitHub</span>
					</Button>
				</div>
			</div>
		</div>
	</div>

	<div class="relative hidden w-0 flex-1 lg:block">
		<img class="absolute inset-0 size-full object-cover" alt="" src="/login.avif" />
	</div>
</div>
