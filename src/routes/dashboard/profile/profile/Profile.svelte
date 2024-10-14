<script lang="ts">
	import { updateUser } from '$lib/auth/store';
	import Alert from '$lib/components/form/alert/Alert.svelte';
	import Button from '$lib/components/form/button/Button.svelte';
	import Input from '$lib/components/form/input/Input.svelte';
	import { DbPaTH } from '$lib/consts';
	import { db } from '$lib/firebase';
	import { storeAvatar } from '$lib/user-utils';
	import { type Auth, updateProfile } from 'firebase/auth';
	import { doc, updateDoc } from 'firebase/firestore';
	import { minidenticon } from 'minidenticons';

	export let user: NonNullable<Auth['currentUser']>;

	let success: boolean = false;

	let isLoading = false;

	let displayName = user.displayName;

	let file: File | null;

	let photoURL = user.photoURL;

	function handleChange(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		if (event.currentTarget.files) {
			[file] = event.currentTarget.files;
			photoURL = URL.createObjectURL(file);
		}
	}

	async function editProfile(
		user: NonNullable<Auth['currentUser']>,
		displayName: null | string,
		photoURL: null | string,
	) {
		await updateProfile(user, { displayName, photoURL });
		const userRef = doc(db, DbPaTH.USERS, user.uid);
		await updateDoc(userRef, { displayName, photoURL });

		updateUser(displayName, photoURL);
	}

	async function onSubmit() {
		isLoading = true;

		if (file) {
			photoURL = await storeAvatar(user.uid, file);
		}

		await editProfile(user, displayName, photoURL);

		success = true;
		isLoading = false;
	}

	async function resetImage() {
		if (!user.email) {
			return;
		}
		const defaultAvatarSvg = minidenticon(user.email, 95, 45);

		file = new File([defaultAvatarSvg], 'defaultAvatar.svg', {
			type: 'image/svg+xml;charset=utf-8',
		});
		photoURL = URL.createObjectURL(file);
	}
</script>

<div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-md">
		<h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
			Profile
		</h2>
	</div>
	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
		<Alert isVisible={!!success} on:close={() => (success = false)} type="success">
			Profile successfully edited
		</Alert>
		<div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
			<form class="space-y-6" enctype="multipart/form-data" on:submit|preventDefault={onSubmit}>
				<div class="col-span-full">
					<h3 class="block text-sm font-medium leading-6 text-gray-900">Avatar</h3>
					<div class="flex items-center gap-x-3">
						<img alt="Your avatar" class="inline-block h-12 w-12" src={photoURL} />
						<label
							class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
						>
							<input
								accept="image/*"
								class="hidden"
								name="avatar"
								on:change={handleChange}
								type="file"
							/>
							Change
						</label>
						<Button on:click={resetImage} type="button">Reset image</Button>
					</div>
				</div>

				<div>
					<div class="mt-2">
						<Input
							bind:value={displayName}
							id="name"
							label="Full name"
							name="name"
							required
							type="text"
						/>
					</div>
				</div>

				<div>
					<div class="mt-2">
						<Input
							disabled
							id="username"
							label="Email addres"
							name="username"
							required
							type="email"
							value={user.email}
						/>
					</div>
				</div>

				<div>
					<Button class="w-full" {isLoading} type="submit">Edit profile</Button>
				</div>
			</form>
		</div>
	</div>
</div>
