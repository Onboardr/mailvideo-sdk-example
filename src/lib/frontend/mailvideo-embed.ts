import { PUBLIC_MAILVIDEO_PUBLISHABLE_KEY } from '$env/static/public';
import { loadMailVideo } from '@mailvideo/embed';

const getJWT = async () => {
	const { tenantId, accountId } = getMailVideoOptionsFromURL();
	const response = await fetch('/api/get-mailvideo-jwt', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ tenantId, accountId }),
	});
	const jwt = await response.text();
	return jwt;
};

/**
 * Get the options from the URL query parameters
 */
const getMailVideoOptionsFromURL = (): {
	tenantId: string | number;
	accountId: string | number;
} => {
	const searchParams = new URLSearchParams(window.location.search);
	const tenantId = convertValue(searchParams.get('tenantId'));
	const accountId = convertValue(searchParams.get('accountId'));

	if (!tenantId || !accountId) {
		alert('Missing required search parameters: tenantId, accountId');
		throw new Error(
			'Missing required search parameters: tenantId, accountId',
		);
	}

	return {
		tenantId,
		accountId,
	};
};

export const convertValue = (value: string | null) => {
	if (!value) {
		return;
	}
	const numberValue = Number(value);
	if (!isNaN(numberValue)) {
		return numberValue;
	}
	return value;
};

export const getMailVideo = async () => {
	const jwt = await getJWT();
	console.log('jwt', jwt);
	const mailvideo = await loadMailVideo({
		publishableKey: PUBLIC_MAILVIDEO_PUBLISHABLE_KEY,
		jwt,
		type: 'whiteLabel',
		verbose: import.meta.env.DEV,
	});
	return mailvideo;
};
