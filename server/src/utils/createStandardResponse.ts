import { StandardResponse } from "@/interfaces";
interface CreateStandardResponse<T> {
	readonly data?: T;
	readonly status?: number;
	readonly errors?: string[];
}

export const createStandardResponse = <T>({
	data,
	errors,
	status,
}: CreateStandardResponse<T>): StandardResponse<T> => {
	return {
		data: data || (null as unknown as T),
		status: status || 0,
		errors: errors || [],
	};
};
