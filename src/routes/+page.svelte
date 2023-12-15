<script lang="ts">
	import { getMailVideo } from '$lib/frontend/mailvideo-embed';
	import ResponseView from '$lib/ResponseView.svelte';
	import type {
		MailVideoEmbedInterface,
		PickVideoResponse,
	} from '@mailvideo/embed';
	import { onMount } from 'svelte';

	let mailvideo: MailVideoEmbedInterface | undefined;
	let customContainer: HTMLDivElement;
	let response: PickVideoResponse | undefined;

	let initialized = false;
	onMount(async () => {
		mailvideo = await getMailVideo();
		await mailvideo.openPlatform({
			divElement: customContainer,
		});
		initialized = true;
	});

	const openIframe = async () => {
		mailvideo = await getMailVideo();
		[response] = await mailvideo.pickVideo();
	};
</script>

<button on:click={openIframe}>Pick MailVideo</button>

<div
	bind:this={customContainer}
	style="width: 100%; height: 500px; border: 1px solid black; margin-top: 20px; margin-bottom: 20px;" />

{#if response}
	<ResponseView response={response} />
{/if}
