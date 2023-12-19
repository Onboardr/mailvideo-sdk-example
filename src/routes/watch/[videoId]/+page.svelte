<script lang="ts">
	import { page } from '$app/stores';
	import { getShareMailVideo } from '$lib/utils/frontend';
	import { type MailVideoEmbedInterface } from '@mailvideo/embed';
	import { onMount } from 'svelte';

	let mailvideo: MailVideoEmbedInterface | undefined;
	let customContainer: HTMLDivElement;

	onMount(async () => {
		mailvideo = await getShareMailVideo();
		const videoId = $page.params.videoId;
		await mailvideo.showPlayer({
			videoId,
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
