<script lang="ts">
	import { page } from '$app/stores';
	import { getVideoHistories } from '$lib/database';
	import type { Tables } from '$lib/database.types';
	import { onMount } from 'svelte';

	let videoHistories: Tables<'Video History'>[] | undefined;

	onMount(async () => {
		videoHistories = await getVideoHistories($page.params.videoId);
	});
</script>

<h1>Analytics</h1>
{#if videoHistories}
	{#each videoHistories as videoHistory (videoHistory.id)}
		<div>
			<h2>{videoHistory.viewerEmail}</h2>
			<p>Percentage Watched: {videoHistory.percentageWatched}</p>
			<p>Watched at: {videoHistory.watchedAt}</p>
		</div>
	{/each}
{:else}
	<p>Loading...</p>
{/if}
