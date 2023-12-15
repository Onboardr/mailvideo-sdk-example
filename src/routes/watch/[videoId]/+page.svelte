<script lang="ts">
	import { page } from '$app/stores';
	import { PUBLIC_MAILVIDEO_PUBLISHABLE_KEY } from '$env/static/public';
	import {
		loadMailVideo,
		type MailVideoEmbedInterface,
	} from '@mailvideo/embed';
	import { onMount } from 'svelte';

	let mailvideo: MailVideoEmbedInterface | undefined;
	let customContainer: HTMLDivElement;

	let initialized = false;
	onMount(async () => {
		mailvideo = await loadMailVideo({
			publishableKey: PUBLIC_MAILVIDEO_PUBLISHABLE_KEY,
			type: 'view',
			verbose: import.meta.env.DEV,
		});
		const videoId = $page.params.videoId;
		await mailvideo.showVideo({
			videoId,
			divElement: customContainer,
			viewer: {
				email: 'external-viewer@test.test',
			},
		});
		initialized = true;
	});
</script>

{#if !initialized}
	<p>Initializing...</p>
{:else}
	<div
		bind:this={customContainer}
		style="width: 100%; height: 500px; border: 1px solid black; margin-top: 20px; margin-bottom: 20px;" />
{/if}
