<script lang="ts">
	import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
	import {
		PUBLIC_AWS_BUCKET_NAME,
		PUBLIC_AWS_BUCKET_REGION,
		PUBLIC_AWS_ACCESS_KEY_ID,
		PUBLIC_AWS_SECRET_ACCESS_KEY,
	} from '$env/static/public';
	import { startVideoProcess } from '$lib/utils/frontend';

	const client = new S3Client({
		region: PUBLIC_AWS_BUCKET_REGION,
		credentials: {
			accessKeyId: PUBLIC_AWS_ACCESS_KEY_ID,
			secretAccessKey: PUBLIC_AWS_SECRET_ACCESS_KEY,
		},
	});

	let inputFile: HTMLInputElement;

	const uploadFile = async (file: File) => {
		try {
			const fileName = file.name;
			const videoTitle = fileName.split('.')[0];
			const inputPath = `upload/${fileName}`;
			const params = {
				Bucket: PUBLIC_AWS_BUCKET_NAME,
				Key: inputPath,
				Body: file,
			};

			const data = await client.send(new PutObjectCommand(params));
			console.log('Successfully uploaded video file', data);

			const videoId = await startVideoProcess({
				videoTitle,
				inputPath,
			});

			console.log('Successfully started processing video', { videoId });
		} catch (err) {
			console.log('Error', err);
		}
	};

	const onChange = (e: Event): void => {
		const target = e.target as HTMLInputElement;
		const file = target.files?.[0];
		if (file) {
			uploadFile(file);
		}
		inputFile.value = '';
	};
</script>

<input
	bind:this={inputFile}
	type="file"
	accept="video/*"
	hidden
	on:change={onChange}
	on:input={onChange}
	on:click|stopPropagation
	on:keydown|stopPropagation />

<button on:click={() => inputFile.click()}>Upload</button>
