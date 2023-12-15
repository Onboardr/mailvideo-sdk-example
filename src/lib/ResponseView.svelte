<script lang="ts">
	import type { PickVideoResponse } from '@mailvideo/embed';
	export let response: PickVideoResponse;
</script>

<p>{response.title}</p>

<p>{response.link}</p>

<div style="width: 560px; height: 315px;">
	{@html response.embedCode}
</div>

<pre>{JSON.stringify(response, null, 2)}</pre>
