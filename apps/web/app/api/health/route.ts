import { db } from "@workspace/db";
import { connection } from "next/server";
import { version } from "@/lib/version";

export async function GET(_request: Request) {
	await connection();
	try {
		await db.$client.connect();
		return Response.json(
			{ status: "healthy", version },
			{
				status: 200,
			}
		);
	} catch {
		return Response.json(
			{ status: "unhealthy", message: "Database connection failed" },
			{
				status: 503,
			}
		);
	}
}
