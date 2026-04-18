import { drizzle } from "drizzle-orm/bun-sql";

// biome-ignore lint/performance/noNamespaceImport: Schemas
import * as schema from "./schema/index.js";

export function createDb() {
	return drizzle(process.env.DATABASE_URL!, { schema });
}

export const db = createDb();
