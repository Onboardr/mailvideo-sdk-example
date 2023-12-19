import { mailvideo } from '$lib/utils/backend';
import { text, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		// Extract the body from the request
		const body = await request.json();
		const { accountId, tenantId } = body;

		// Validate that both accountId and tenantId are provided
		if (!accountId || !tenantId) {
			error(400, 'Missing accountId or tenantId in request body');
		}

		const email = `${accountId}@${tenantId}.com`;
		const firstName = `User ${accountId}`;
		const tenantName = `Team ${tenantId}`;

		// Generate the JWT
		const jwt = await mailvideo.createJWT({
			account: {
				id: accountId,
				firstName,
				email,
			},
			tenant: {
				id: tenantId,
				name: tenantName,
			},
		});

		// Return the JWT in the response
		return text(jwt);
	} catch (e) {
		console.error('Error generating JWT', e);
		error(500, 'Internal Server Error');
	}
};
