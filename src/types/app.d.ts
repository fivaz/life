/// <reference types="lucia" />
declare global {
	namespace Lucia {
		type Auth = import('$lib/server/lucia').Auth;
		type DatabaseUserAttributes = {
			avatar: string;
			name: string;
			username: string;
		};
		// eslint-disable-next-line @typescript-eslint/ban-types
		type DatabaseSessionAttributes = {};
	}

	namespace App {
		interface Locals {
			auth: import('lucia').AuthRequest;
		}
	}
}

// THIS IS IMPORTANT!!!
export {};
