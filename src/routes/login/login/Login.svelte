<script lang="ts">
	import { goto } from '$app/navigation';
	import Logo from '$lib/components/Logo.svelte';
	import Alert from '$lib/components/form/alert/Alert.svelte';
	import Button from '$lib/components/form/button/Button.svelte';
	import { DB_PATH, Routes } from '$lib/consts';
	import { auth, db } from '$lib/firebase';
	import {
		signInWithEmailAndPassword,
		signInWithPopup,
		GoogleAuthProvider,
		GithubAuthProvider,
		type User,
	} from 'firebase/auth';
	import { parseErrors, validateFields } from './service';
	import { doc, getDoc } from 'firebase/firestore';
	import { createUser } from '../../register/register/service';
	import { minidenticon } from 'minidenticons';
	import GithubIcon from '../GithubIcon.svelte';
	import GoogleIcon from '../GoogleIcon.svelte';

	let isLoadingEmailProvider = $state<boolean>(false);

	let isLoadingGoogleProvider = $state<boolean>(false);

	let isLoadingGithubProvider = $state<boolean>(false);

	let isDisabled = $derived(
		isLoadingEmailProvider || isLoadingGoogleProvider || isLoadingGithubProvider,
	);

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
			isLoadingEmailProvider = true;
			await signInWithEmailAndPassword(auth, email, password);
			void goto(Routes.HOME);
		} catch (error) {
			errorMessage = parseErrors(error);
		} finally {
			isLoadingEmailProvider = false;
		}
	}

	async function googleSignIn() {
		isLoadingGoogleProvider = true;
		try {
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, provider);
			await handleProviderLogin(result.user);
		} catch (error) {
			errorMessage = parseErrors(error);
		} finally {
			isLoadingGoogleProvider = false;
		}
	}

	async function handleProviderLogin(user: User) {
		const userRef = doc(db, DB_PATH.USERS, user.uid);
		const docSnap = await getDoc(userRef);
		if (!docSnap.exists()) {
			if (!user.email) {
				throw Error("google didn't return user's email");
			}

			const avatar = minidenticon(user.email, 95, 45);

			await createUser(user, user.displayName || 'unnamed user', user.email, avatar);
		}

		return goto(Routes.HOME);
	}

	async function githubSignIn() {
		isLoadingGithubProvider = true;
		try {
			const provider = new GithubAuthProvider();
			const result = await signInWithPopup(auth, provider);
			await handleProviderLogin(result.user);
		} catch (error) {
			errorMessage = parseErrors(error);
		} finally {
			isLoadingGithubProvider = false;
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
							<Button
								disabled={isDisabled}
								class="w-full leading-6"
								isLoading={isLoadingEmailProvider}
								type="submit"
							>
								Sign in
							</Button>
						</div>
					</form>
				</div>
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
					color="none"
					onclick={googleSignIn}
					isLoading={isLoadingGoogleProvider}
					disabled={isDisabled}
					class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
				>
					<GoogleIcon />
					<span class="text-sm/6 font-semibold">Google</span>
				</Button>

				<Button
					color="none"
					isLoading={isLoadingGithubProvider}
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

	<div class="relative hidden w-0 flex-1 lg:block">
		<img
			alt=""
			class="absolute inset-0 h-full w-full object-cover"
			src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
		/>
	</div>
</div>
