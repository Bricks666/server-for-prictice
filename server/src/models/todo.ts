export interface Todo {
	readonly id: number;
	readonly name: string;
	readonly owner: string;
	readonly done: boolean;
}

export type TodoCreate = Omit<Todo, "id">;
