function extractValues(obj: Record<string, unknown>): string[] {
	let result: string[] = [];
	for (const key in obj) {
		if (obj[key] !== null) {
			if (typeof obj[key] === 'object') {
				result = result.concat(extractValues(obj[key] as Record<string, unknown>));
			} else {
				result.push(String(obj[key]));
			}
		}
	}
	return result;
}

export function getErrors(errors: Record<string, unknown>) {
	const errorList = extractValues(errors);
	return errorList.join(', ');
}
