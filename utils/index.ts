import { useControls as useLevaControls } from "leva";

export function nr() {
	return Math.random() * 2 - 1;
}

export function useControls<Schema extends Record<string, any>>(
	group: string,
	schema: Schema
): Schema {
	if (process.env.NODE_ENV !== "production") {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		return useLevaControls(group, schema) as Schema;
	}

	return schema;
}
