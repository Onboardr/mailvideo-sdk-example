import { MailVideo } from '@mailvideo/backend';
import { MAILVIDEO_SECRET } from '$env/static/private';

export const mailvideo = new MailVideo({
	secret: MAILVIDEO_SECRET,
	verbose: import.meta.env.DEV,
});
