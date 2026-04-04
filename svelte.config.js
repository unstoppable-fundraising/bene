import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { existsSync } from 'node:fs';

// If a CNAME file exists (custom domain), base path must be empty.
// Otherwise, derive base from the repo name for GitHub Pages sub-path hosting.
const hasCustomDomain = existsSync('static/CNAME');
const base = process.env.BASE_PATH ?? (hasCustomDomain
	? ''
	: (process.env.NODE_ENV === 'production'
		? `/${(process.env.GITHUB_REPOSITORY ?? '').split('/')[1] ?? ''}`.replace(/\/$/, '')
		: ''));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html'
		}),
		paths: {
			base
		}
	}
};

export default config;
