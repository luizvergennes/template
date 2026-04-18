import { createDb, schema } from "@workspace/db";
import { env } from "@workspace/env/web";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

// biome-ignore lint/performance/noBarrelFile: Next.js
export { toNextJsHandler } from "better-auth/next-js";
export { createAuthClient } from "better-auth/react";

const createAuth = () => {
	const db = createDb();

	return betterAuth({
		database: drizzleAdapter(db, {
			provider: "pg",
			schema,
		}),
		emailAndPassword: {
			enabled: true,
		},
		advanced: {
			trustedProxyHeaders: true,
			cookiePrefix: env.PROJECT_NAME,
		},
		plugins: [nextCookies()],
	});
};

export const auth = createAuth();
