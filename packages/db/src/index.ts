import { env } from "@workspace/env/web";
import { drizzle } from "drizzle-orm/bun-sql";
// biome-ignore lint/performance/noNamespaceImport: Schemas
import * as schema from "./schema";

// biome-ignore lint/performance/noBarrelFile: Schemas
export * as schema from "./schema";

export function createDb() {
	return drizzle(env.DATABASE_URL, { schema });
}

export const db = createDb();
