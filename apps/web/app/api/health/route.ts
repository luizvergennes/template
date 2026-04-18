import { db } from "@workspace/db";
import { connection } from "next/server";

export async function GET(_request: Request) {
	await connection();
	try {
		await db.$client.connect();
		return Response.json(
			{ status: "healthy" },
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
