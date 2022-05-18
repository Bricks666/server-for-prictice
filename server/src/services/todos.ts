import { TodosT } from "@/database";
import { TodoCreate } from "@/models";
import { AnyObject } from "mariadb-table-wrapper";

export class TodosService {
	static async getTodos(owner: string | undefined) {
		const filters: AnyObject = {};

		if (owner) {
			filters.owner = {
				operator: "=",
				value: owner,
			};
		}

		return await TodosT.select({
			filters,
		});
	}
	static async getTodo(id: number) {
		return await TodosT.selectOne({
			filters: {
				id: {
					operator: "=",
					value: id,
				},
			},
		});
	}
	static async addTodo(todo: TodoCreate) {
		await TodosT.insert(todo);

		return await TodosT.selectOne({
			filters: {
				name: {
					operator: "=",
					value: todo.name,
				},
				owner: {
					operator: "=",
					value: todo.owner,
				},
				done: {
					operator: "=",
					value: +todo.done,
				},
			},
			orderBy: {
				id: "DESC",
			},
		});
	}
	static async updateTodo(todoId: number, todo: Partial<TodoCreate>) {
		await TodosT.update(todo, {
			filters: {
				id: {
					operator: "=",
					value: +todoId,
				},
			},
		});

		return await TodosT.selectOne({
			filters: {
				id: {
					operator: "=",
					value: +todoId,
				},
			},
		});
	}

	static async deleteTodo(todoId: number) {
		await TodosT.delete({ filters: { id: { operator: "=", value: todoId } } });
	}
}
