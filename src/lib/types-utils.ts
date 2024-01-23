import type { ActionResult, MaybePromise } from '@sveltejs/kit';

export type SubSubmitFunction<D, F> = ({
	formData,
	data,
	form,
}: {
	formData: FormData;
	data: D;
	form: F;
}) => MaybePromise<(opts: { result: ActionResult }) => void>;
