import {
	PUBLIC_MAILVIDEO_PUBLISHABLE_KEY,
	PUBLIC_MAILVIDEO_PUBLISHABLE_LOCAL_KEY,
} from '$env/static/public';
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

/**
 * Get the MailVideo instance for the pwa.
 *
 * This will load the MailVideo instance with the tenantId and accountId from the URL query parameters.
 * @returns The MailVideo instance
 */
export const getAppMailVideo = async () => {
	const jwt = await getJWT();

	const mailvideo = await loadMailVideo({
		publishableKey: getPublishableKey(),
		jwt,
		type: 'whiteLabel',
		verbose: import.meta.env.DEV,
	});
	return mailvideo;
};

/**
 * Get the MailVideo instance for the share page.
 *
 * This will not login the user, but will allow them to view the video.
 * @returns The MailVideo instance
 */
export const getShareMailVideo = async () => {
	const mailvideo = await loadMailVideo({
		publishableKey: getPublishableKey(),
		type: 'view',
		verbose: import.meta.env.DEV,
	});
	return mailvideo;
};

const getPublishableKey = () => {
	const searchParams = new URLSearchParams(window.location.search);
	const publishableKey = searchParams.get('publishableKey');
	if (publishableKey) {
		return publishableKey;
	}

	if (searchParams.get('local')) {
		return PUBLIC_MAILVIDEO_PUBLISHABLE_LOCAL_KEY;
	}

	return PUBLIC_MAILVIDEO_PUBLISHABLE_KEY;
};
