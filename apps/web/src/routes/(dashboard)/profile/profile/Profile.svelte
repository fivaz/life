<script lang="ts">
	import { Alert, Button, LInput } from '@life/shared';
	import type { User as FirebaseUser } from 'firebase/auth';
	import { updateProfile } from 'firebase/auth';
	import { doc, updateDoc } from 'firebase/firestore';
	import { minidenticon } from 'minidenticons';

	import { DB_PATH } from '$lib/consts';
	import { auth, db } from '$lib/firebase';
	import type { User } from '$lib/user/user.model';
	import { storeAvatar } from '$lib/user/user.repository';
	import { updateUser } from '$lib/user/user.utils.svelte';

	interface Props {
		user: User;
	}

	let { user }: Props = $props();

	let success = $state<boolean>(false);

	let isLoading = $state<boolean>(false);

	let displayName = $state<string>((() => user.displayName)());

	let photoURL = $state((() => user.photoURL)());

	let file: File | null = $state(null);

	let firebaseUser: FirebaseUser | null = $state(auth.currentUser);

	function handleChange(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		if (event.currentTarget.files) {
			[file] = event.currentTarget.files;
			photoURL = URL.createObjectURL(file);
		}
	}

	async function editProfile(user: FirebaseUser, displayName: string, photoURL: string) {
		await updateProfile(user, { displayName, photoURL });
		const userRef = doc(db, DB_PATH.USERS, user.uid);
		await updateDoc(userRef, { displayName, photoURL });

		updateUser(displayName, photoURL);
	}

	async function onSubmit(event: SubmitEvent) {
		event.preventDefault();
		isLoading = true;
		try {
			if (file) {
				photoURL = await storeAvatar(user.uid, file);
			}

			if (firebaseUser) {
				await editProfile(firebaseUser, displayName, photoURL);
			}

			success = true;
		} catch (error) {
			console.error(error);
		} finally {
			isLoading = false;
		}
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
		<h2 class="mt-6 text-center text-2xl leading-9 font-bold tracking-tight text-gray-900">
			Profile
		</h2>
	</div>
	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
		<Alert close={() => (success = false)} isVisible={!!success} type="success">
			Profile successfully edited
		</Alert>
		<div class="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
			<form class="space-y-6" enctype="multipart/form-data" onsubmit={onSubmit}>
				<div class="col-span-full">
					<h3 class="block text-sm leading-6 font-medium text-gray-900">Avatar</h3>
					<div class="flex items-center gap-x-3">
						<img class="inline-block size-12" alt="Your avatar" src={photoURL} />
						<label
							class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
						>
							<input
								name="avatar"
								class="hidden"
								accept="image/*"
								onchange={handleChange}
								type="file"
							/>
							Change
						</label>
						<Button onclick={resetImage} type="button">Reset image</Button>
					</div>
				</div>

				<div>
					<div class="mt-2">
						<LInput
							id="name"
							name="name"
							inputClass="w-full"
							label="Full name"
							required
							type="text"
							bind:value={displayName}
						/>
					</div>
				</div>

				<div>
					<div class="mt-2">
						<LInput
							id="username"
							name="username"
							disabled
							inputClass="w-full"
							label="Email address"
							required
							type="email"
							value={user.email || ''}
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
