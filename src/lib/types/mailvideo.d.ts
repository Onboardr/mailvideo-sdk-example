/// <reference types="@mailvideo/backend" />

declare namespace MailVideo {
	type MailVideoViewerData = import('./viewer').MailVideoViewerData;

	export type ViewerData = MailVideoViewerData;
}
