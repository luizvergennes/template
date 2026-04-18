import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "standalone",
	poweredByHeader: false,
	generateBuildId: () => process.env.GIT_COMMIT_SHA ?? crypto.randomUUID(),
	deploymentId: process.env.GIT_COMMIT_SHA,
	typedRoutes: true,
	reactCompiler: true,
	transpilePackages: ["@workspace/ui"],
	serverExternalPackages: [
		"@workspace/env",
		"@workspace/auth",
		"@workspace/db",
	],
};

export default nextConfig;
