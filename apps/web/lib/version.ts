import { env } from "@workspace/env/web";

const checkVersion = () => {
	if (env.NODE_ENV === "production") {
		return env.npm_package_version;
	}
	return env.NODE_ENV;
};

export const version = checkVersion();
