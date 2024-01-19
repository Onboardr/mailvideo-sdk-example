import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { mailvideo } from '$lib/utils/backend';

export const load: PageServerLoad = async (event) => {
	const { params } = event;
	const { videoId } = params;

	try {
		const video = await mailvideo.fetchVideo({
			videoId,
		});
		return {
			video,
		};
	} catch (e) {
		console.error(e);
		error(404, 'Video not found');
	}
};
