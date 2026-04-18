import { healthCheck } from "@workspace/db/utils";
import { connection } from "next/server";
import { version } from "@/lib/version";

export async function GET(_request: Request) {
	await connection();
	try {
		await healthCheck();
		return Response.json(
			{ status: "healthy", version },
			{
				status: 200,
				headers: {
					"Cache-Control": "no-cache",
				},
			}
		);
	} catch (e: unknown) {
		const message = e instanceof Error ? e.message : "Unknown Error";
		return Response.json(
			{ status: "unhealthy", message },
			{
				status: 503,
				headers: {
					"Cache-Control": "no-cache",
				},
			}
		);
	}
}
