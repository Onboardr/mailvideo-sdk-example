<script lang="ts">
	import { getAppMailVideo } from '$lib/utils/frontend';
	import ResponseView from '$lib/components/ResponseView.svelte';
	import type {
		MailVideoEmbedJWTAuthenticatedInterface,
		PickVideoResponse,
	} from '@mailvideo/embed';
	import { onMount } from 'svelte';

	let mailvideoPlatform: MailVideoEmbedJWTAuthenticatedInterface | undefined;
	let mailvideoPicker: MailVideoEmbedJWTAuthenticatedInterface | undefined;

	let customContainer: HTMLDivElement;
	let response: PickVideoResponse | undefined;

	onMount(async () => {
		mailvideoPlatform = await getAppMailVideo();
		mailvideoPicker = await getAppMailVideo(true);

		await mailvideoPlatform.openPlatform({
			divElement: customContainer,
		});
	});

	const openIframe = async () => {
		if (!mailvideoPicker) {
			console.error('MailVideo picker not initialized');
			return;
		}
		[response] = await mailvideoPicker.pickVideo();
	};
</script>

<button on:click={openIframe}>Pick MailVideo</button>

<div
	bind:this={customContainer}
	style="width: 100%; height: 900px; border: 1px solid black; margin-top: 20px; margin-bottom: 20px;" />

{#if response}
	<ResponseView response={response} />
{/if}
