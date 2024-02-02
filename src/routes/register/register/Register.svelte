<script lang="ts">
	import { validator } from '@felte/validator-yup';
	import { goto } from '$app/navigation';
	import Alert from '$lib/components/alert/Alert.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import { loginRoute, rootRoute } from '$lib/consts';
	import { auth, db } from '$lib/firebase';
	import { createForm } from 'felte';
	import { FirebaseError } from 'firebase/app';
	import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
	import { doc, setDoc } from 'firebase/firestore';
	import { minidenticon } from 'minidenticons';
	import { object, string } from 'yup';

	let isLoading: boolean = false;

	let email = '';

	let errorMessage: string | unknown = '';

	const schema = object({
		displayName: string().required(),
		email: string().email().required(),
		password: string().required().min(6, 'Password should be at least 6 characters'),
	});

	type Account = {
		photoURL: string;
		displayName: string;
		email: string;
		password: string;
	};

	async function register({ email, password, displayName, photoURL }: Account) {
		const { user } = await createUserWithEmailAndPassword(auth, email, password);
		await updateProfile(user, { displayName });
		const userRef = doc(db, 'users', user.uid);
		await setDoc(userRef, {
			photoURL,
			displayName,
			email,
		});
	}

	const { form, errors } = createForm<Omit<Account, 'photoURL'>>({
		extend: [validator({ schema })],
		onSubmit: async (values) => {
			console.log(values);
			isLoading = true;
			await register({ ...values, photoURL });
			void goto(rootRoute);
		},
		onError: (error) => {
			if (error instanceof FirebaseError) {
				if (error.code === 'auth/email-already-in-use') {
					errorMessage = 'This email is already in use';
				} else {
					errorMessage = error.message;
				}
			} else {
				errorMessage = error;
			}
			isLoading = false;
		},
	});

	$: photoURL = 'data:image/svg+xml;utf8,' + encodeURIComponent(minidenticon(email, 95, 45));

	$: {
		errorMessage = Object.values($errors)
			.filter((value) => value)
			.join(', ');
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
		<Alert type="error" isVisible={!!errorMessage} on:close={() => (errorMessage = '')}>
			{errorMessage}
		</Alert>

		<div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
			<form class="space-y-6" use:form>
				{#if email}
					<div class="flex flex-col justify-center">
						<h3 class="text-center block text-sm font-medium leading-6 text-gray-900">
							Your Avatar
						</h3>
						<img class="h-10 w-auto" src={photoURL} alt="your avatar" />
					</div>
				{/if}
				<div>
					<label for="name" class="block text-sm font-medium leading-6 text-gray-900">
						Full name
					</label>
					<div class="mt-2">
						<input
							id="name"
							name="displayName"
							type="text"
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
