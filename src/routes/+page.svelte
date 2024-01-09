<script lang="ts">
	import { getAppMailVideo } from '$lib/utils/frontend';
	import ResponseView from '$lib/components/ResponseView.svelte';
	import type {
		MailVideoEmbedInterface,
		PickVideoResponse,
	} from '@mailvideo/embed';
	import { onMount } from 'svelte';

	let mailvideo: MailVideoEmbedInterface | undefined;
	let customContainer: HTMLDivElement;
	let response: PickVideoResponse | undefined;

	onMount(async () => {
		mailvideo = await getAppMailVideo();
		await mailvideo.openPlatform({
			divElement: customContainer,
		});
	});

	const openIframe = async () => {
		mailvideo = await getAppMailVideo();
		[response] = await mailvideo.pickVideo();
	};
</script>

<button on:click={openIframe}>Pick MailVideo</button>

<div
	bind:this={customContainer}
	style="width: 100%; height: 900px; border: 1px solid black; margin-top: 20px; margin-bottom: 20px;" />

{#if response}
	<ResponseView response={response} />
{/if}
