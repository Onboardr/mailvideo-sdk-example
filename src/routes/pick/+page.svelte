<script lang="ts">
	import { getAppMailVideo } from '$lib/utils/frontend';
	import ResponseView from '$lib/components/ResponseView.svelte';
	import type {
		MailVideoEmbedJWTAuthenticatedInterface,
		PickVideoResponse,
	} from '@mailvideo/embed';
	import { onMount } from 'svelte';

	let mailvideoPicker: MailVideoEmbedJWTAuthenticatedInterface | undefined;

	let response: PickVideoResponse | undefined;

	onMount(async () => {
		mailvideoPicker = await getAppMailVideo(true);
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

{#if response}
	<ResponseView response={response} />
{/if}
