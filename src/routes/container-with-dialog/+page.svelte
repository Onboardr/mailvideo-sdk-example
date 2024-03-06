<script lang="ts">
	import { getJWT, getPublishableKey } from '$lib/utils/frontend';
	import {
		loadMailVideo,
		type MailVideoEmbedJWTAuthenticatedInterface,
	} from '@mailvideo/embed';
	import { onMount } from 'svelte';

	let customContainer: HTMLDivElement;
	let mailvideoVideoEditor:
		| MailVideoEmbedJWTAuthenticatedInterface
		| undefined;
	let mailvideoContainer: MailVideoEmbedJWTAuthenticatedInterface | undefined;

	onMount(async () => {
		const jwt = await getJWT();
		const publishableKey = getPublishableKey();
		mailvideoContainer = await loadMailVideo({
			publishableKey,
			type: 'jwtAuthenticated',
			jwt,
			logLevel: 'INFO',
			onVideoEditorClicked: (options) => {
				if (!mailvideoVideoEditor) {
					throw new Error('mailvideoVideoEditor is not defined');
				}
				return mailvideoVideoEditor.openVideoEditor(options);
			},
		});
		mailvideoContainer.openPlatform({
			divElement: customContainer,
		});
		mailvideoVideoEditor = await loadMailVideo({
			publishableKey,
			type: 'jwtAuthenticated',
			jwt,
			logLevel: 'INFO',
			preload: true,
		});
	});
</script>

<div
	bind:this={customContainer}
	style="width: 100%; height: 900px; border: 1px solid black; margin-top: 20px; margin-bottom: 20px;" />
