import type { ActionResult, MaybePromise } from '@sveltejs/kit';

export type SubSubmitFunction = ({
	formData,
}: {
	formData: FormData;
}) => MaybePromise<(opts: { result: ActionResult }) => void>;
