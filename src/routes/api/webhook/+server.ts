import { json, error } from '@sveltejs/kit';
import { constructAndHandleMailVideoEvent } from '@mailvideo/backend';
import { MAILVIDEO_WEBHOOK_SECRET } from '$env/static/private';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const signature = request.headers.get('mailvideo-signature');
		if (!signature) {
			error(400, 'Missing signature in request headers');
		}

		await constructAndHandleMailVideoEvent({
			payload: await request.json(),
			signature,
			secret: MAILVIDEO_WEBHOOK_SECRET,
			actions: {
				'video.process.success': async (payload) => {
					console.log('video processed success', payload);
				},
				'video.process.failed': async (payload) => {
					console.log('video processed failed', payload);
				},
				'video.viewed': async (payload) => {
					console.log('video viewed', payload);
				},
			},
		});

		return json({
			success: true,
		});
	} catch (e) {
		console.error('Error handling mailvideo webhook', e);
		error(500, 'Internal Server Error');
	}
};
