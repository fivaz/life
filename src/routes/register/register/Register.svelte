<script lang="ts">
	import { goto } from '$app/navigation';
	import Alert from '$lib/components/alert/Alert.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import { loginRoute, rootRoute } from '$lib/consts';
	import { auth, db } from '$lib/firebase';
	import { storeAvatar } from '$lib/user-utis';
	import { validator } from '@felte/validator-yup';
	import { createForm } from 'felte';
	import { FirebaseError } from 'firebase/app';
	import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
	import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
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
		displayName: string;
		email: string;
		password: string;
		photoURL: string;
	};

	async function addDefaultCategories(userId: string) {
		// TODO when one select a category as default, make all other non default
		const categoriesCollectionRef = collection(db, 'users', userId, 'categories');
		void addDoc(categoriesCollectionRef, {
			color: 'green',
			isDefault: true,
			name: 'work',
			type: 'work',
		});
		void addDoc(categoriesCollectionRef, {
			color: 'blue',
			isDefault: false,
			name: 'sleep',
			type: 'sleep',
		});
		void addDoc(categoriesCollectionRef, {
			color: 'red',
			isDefault: false,
			name: 'fun',
			type: 'fun',
		});
	}

	async function register({ displayName, email, password }: Omit<Account, 'photoURL'>) {
		const { user } = await createUserWithEmailAndPassword(auth, email, password);

		const photoURL = await storeAvatar(
			user.uid,
			new Blob([avatar], { type: 'image/svg+xml;charset=utf-8' }),
		);

		await updateProfile(user, { displayName, photoURL });

		const userRef = doc(db, 'users', user.uid);

		await setDoc(userRef, {
			displayName,
			email,
			photoURL,
		});

		await addDefaultCategories(user.uid);
	}

	const { errors, form } = createForm<Omit<Account, 'photoURL'>>({
		extend: [validator({ schema })],
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
		onSubmit: async (values) => {
			isLoading = true;
			await register({ ...values });
			void goto(rootRoute);
		},
	});

	$: avatar = minidenticon(email, 95, 45);

	$: photoURL = 'data:image/svg+xml;utf8,' + encodeURIComponent(avatar);

	$: {
		errorMessage = Object.values($errors)
			.filter((value) => value)
			.join(', ');
	}
</script>

<div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-md">
		<img
			alt="Your Company"
			class="mx-auto h-10 w-auto"
			src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
		/>
		<h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
			Create your account
		</h2>
	</div>

	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
		<Alert isVisible={!!errorMessage} on:close={() => (errorMessage = '')} type="error">
			{errorMessage}
		</Alert>

		<div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
			<form class="space-y-6" use:form>
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
			<a class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" href={loginRoute}>
				Log in
			</a>
		</p>
	</div>
</div>
