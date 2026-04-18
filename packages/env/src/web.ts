import { z } from "zod/mini";

const webEnvSchema = z.object({
	NODE_ENV: z.enum(["development", "production", "test"]),
	DATABASE_URL: z.string(),
});

const createEnv = (env: NodeJS.ProcessEnv) => {
	const result = webEnvSchema.safeParse(env);
	if (result.success) {
		return result.data;
	}

	process.exitCode = 1;
	throw new Error(result.error.message);
};

export const env = createEnv(process.env);
