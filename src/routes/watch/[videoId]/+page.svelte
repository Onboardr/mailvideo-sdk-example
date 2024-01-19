<script lang="ts">
	import { getShareMailVideo } from '$lib/utils/frontend';
	import { type MailVideoEmbedViewInterface } from '@mailvideo/embed';
	import { onMount } from 'svelte';

	import type { PageData } from './$types';

	export let data: PageData;

	const { video } = data;
	let mailvideo: MailVideoEmbedViewInterface | undefined;
	let customContainer: HTMLDivElement;

	onMount(async () => {
		mailvideo = await getShareMailVideo();
		await mailvideo.showPlayer({
			videoId: video.videoId,
			thumbnailURL: video.thumbnailURL,
			divElement: customContainer,
			viewer: {
				email: 'external-viewer@test.test',
			},
		});
	});
</script>

<div
	bind:this={customContainer}
	style="width: 100%; height: 500px; border: 1px solid black; margin-top: 20px; margin-bottom: 20px;" />
