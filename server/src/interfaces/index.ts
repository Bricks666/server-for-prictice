export interface StandardResponse<T> {
	readonly data: T;
	readonly errors: string[];
	readonly status: number;
}
