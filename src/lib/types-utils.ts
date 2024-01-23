import type { ActionResult, MaybePromise } from '@sveltejs/kit';

export type SubSubmitFunction<D> = ({
	formData,
	data,
}: {
	formData: FormData;
	data: D;
}) => MaybePromise<(opts: { result: ActionResult }) => void>;
