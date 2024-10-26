<script lang="ts">
	import { goto } from '$app/navigation';
	import Logo from '$lib/components/Logo.svelte';
	import Alert from '$lib/components/form/alert/Alert.svelte';
	import Button from '$lib/components/form/button2/Button2.svelte';
	import { DB_PATH, Routes } from '$lib/consts';
	import { auth, db } from '$lib/firebase';
	import { checkEmail, storeAvatar } from '$lib/auth/utils';
	import { validator } from '@felte/validator-yup';
	import { createForm } from 'felte';
	import { FirebaseError } from 'firebase/app';
	import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
	import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
	import { minidenticon } from 'minidenticons';
	import { object, string } from 'yup';
	import { addDefaultCategories, parseErrors, validateFields } from './service';

	let name = $state<string>('');
	let email = $state<string>('');
	let password = $state<string>('');

	let isLoading = $state<boolean>(false);

	let errorMessage = $state<string>('');

	let avatar = $derived(minidenticon(email, 95, 45));

	let photoURL = $derived('data:image/svg+xml;utf8,' + encodeURIComponent(avatar));

	async function onSubmit(event: SubmitEvent) {
		event.preventDefault();
		errorMessage = validateFields(email, password);
		if (errorMessage) {
			return;
		}

		try {
			isLoading = true;
			await register(name, email, password);
			void goto(Routes.ROOT);
		} catch (error) {
			errorMessage = parseErrors(error);
		} finally {
			isLoading = false;
		}
	}

	async function register(displayName: string, email: string, password: string) {
		const { user } = await createUserWithEmailAndPassword(auth, email, password);

		const photoURL = await storeAvatar(
			user.uid,
			new Blob([avatar], { type: 'image/svg+xml;charset=utf-8' }),
		);

		await updateProfile(user, { displayName, photoURL });

		const userRef = doc(db, DB_PATH.USERS, user.uid);

		await setDoc(userRef, {
			displayName,
			email,
			photoURL,
		});

		await addDefaultCategories(user.uid);
	}
</script>

<div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-md">
		<Logo class="m-auto h-10 w-auto text-indigo-600" />
		<h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
			Create your account
		</h2>
	</div>

	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
		<Alert class="mb-3" isVisible={!!errorMessage} close={() => (errorMessage = '')} type="error">
			{errorMessage}
		</Alert>

		<div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
			<form class="space-y-6" onsubmit={onSubmit}>
				{#if email}
					<div class="flex flex-col justify-center">
						<h3 class="block text-center text-sm font-medium leading-6 text-gray-900">
							Your Avatar
						</h3>
						<img alt="your avatar" class="h-10 w-auto" src={photoURL} />
					</div>
				{/if}
				<div>
					<label class="block text-sm font-medium leading-6 text-gray-900" for="name">
						Full name
					</label>
					<div class="mt-2">
						<input
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							id="name"
							name="displayName"
							type="text"
							bind:value={name}
						/>
					</div>
				</div>
				<div>
					<label class="block text-sm font-medium leading-6 text-gray-900" for="email">
						Email address
					</label>
					<div class="mt-2">
						<input
							autocomplete="email"
							bind:value={email}
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							id="password"
							name="password"
							type="password"
							bind:value={password}
						/>
					</div>
				</div>

				<div>
					<Button class="w-full leading-6" disabled={isLoading} {isLoading} type="submit">
						Register
					</Button>
				</div>
			</form>
		</div>

		<p class="mt-10 text-center text-sm text-gray-500">
			Already a member?
			{' '}
			<a class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" href={Routes.LOGIN}>
				Log in
			</a>
		</p>
	</div>
</div>
