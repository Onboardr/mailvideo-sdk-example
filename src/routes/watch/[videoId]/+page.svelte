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
	style="width: 500px; height: 500px; margin: 20px" />
