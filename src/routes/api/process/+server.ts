import { mailvideo } from '$lib/server/mailvideo-backend';
import { text, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

/**
 * Start processing a video from your own custom bucket
 */
export const POST: RequestHandler = async ({ request }) => {
	try {
		// Extract the body from the request
		const body = await request.json();
		const { accountId, tenantId, inputPath, videoTitle } = body;

		// Validate that both accountId and tenantId are provided
		if (!accountId || !tenantId || !inputPath) {
			error(
				400,
				'Missing accountId or tenantId or inputPath in request body',
			);
		}

		const email = `${accountId}@${tenantId}.com`;
		const tenantName = `Team ${tenantId}`;
		const firstName = `User ${accountId}`;

		const options = {
			input: {
				path: inputPath,
				type: 'bucket',
			},
			account: {
				id: accountId,
				email,
				firstName,
			},
			tenant: {
				id: tenantId,
				name: tenantName,
			},
			videoTitle,
		} as const;

		console.log('processVideo:options', options);

		const { videoId } = await mailvideo.processVideo(options);

		console.log('videoId', videoId);

		return text(videoId);
	} catch (e) {
		console.error('Error generating JWT:', e);
		error(500, 'Internal Server Error');
	}
};
