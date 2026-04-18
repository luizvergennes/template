import { db } from "@workspace/db";

export async function GET(_request: Request) {
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
