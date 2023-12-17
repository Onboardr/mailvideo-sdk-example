# README for `mailvideo-sdk-example`

## Overview

The `mailvideo-sdk-example` project demonstrates the usage of `@mailvideo/backend` and `@mailvideo/embed` within a SvelteKit application. This project is an example implementation showcasing how to integrate MailVideo's SDKs for video functionalities in your SvelteKit application.

-   [@mailvideo/embed ![npm (@mailvideo/embed)](https://img.shields.io/npm/v/@mailvideo/embed)](https://www.npmjs.com/package/@mailvideo/embed)
-   [@mailvideo/backend ![npm (@mailvideo/backend)](https://img.shields.io/npm/v/@mailvideo/backend)](https://www.npmjs.com/package/@mailvideo/backend)

### Features

-   JWT generation for authentication.
-   Handling MailVideo webhooks.
-   Embedding MailVideo in a SvelteKit application.
-   Picking a video from MailVideo platform.

## Getting Started

### Prerequisites

-   Node.js
-   Access to MailVideo SDKs (`@mailvideo/backend` and `@mailvideo/embed`)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-org/mailvideo-sdk-example.git
    cd mailvideo-sdk-example
    ```

2. Install dependencies:

    ```bash
    pnpm install
    ```

3. Set up environment variables by copying the `.env.example` file to `.env` and filling in your MailVideo credentials.

### Running the Project

To start the development server:

```bash
pnpm dev
```

## Project Structure

### API Routes

1. `src/routes/api/jwt/+server.ts`: Generates JWT for MailVideo authentication.
2. `src/routes/api/webhook/+server.ts`: Handles incoming webhooks from MailVideo.

### Client-Side

1. `src/routes/+page.svelte`: Main entry page with MailVideo integration.
2. `src/routes/watch/[videoId]/+page.svelte`: Page to view a specific MailVideo.
3. `src/lib/frontend/mailvideo-embed.ts`: Utility functions for embedding MailVideo on the client side.
4. `src/lib/server/mailvideo-backend.ts`: Backend utility for MailVideo functionalities.

## Environment Variables

-   `MAILVIDEO_SECRET`: Your MailVideo secret key.
-   `PUBLIC_MAILVIDEO_PUBLISHABLE_KEY`: Your MailVideo publishable key.
-   `MAILVIDEO_WEBHOOK_SECRET`: Your MailVideo webhook secret.

## Support

For support, please open an issue in the repository or contact our support team.
