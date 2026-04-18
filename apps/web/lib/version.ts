import { env } from "@workspace/env/web";

const checkVersion = () => {
	if (env.NODE_ENV === "production") {
		return process.env.APP_VERSION || "unknown";
	}
	return env.NODE_ENV;
};

export const version = checkVersion();
