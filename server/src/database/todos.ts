import { Todo } from "@/models";
import { Table, TableConfig } from "mariadb-table-wrapper";

export const TODOS_T = "todos";

const config: TableConfig<Todo> = {
	table: TODOS_T,
	fields: {
		id: {
			type: "SMALLINT",
			isPrimaryKey: true,
			isAutoIncrement: true,
			isUnsigned: true,
		},
		name: {
			type: "VARCHAR",
			stringLen: 32,
			isNotNull: true,
		},
		owner: {
			type: "SMALLINT",
			stringLen: 32,
			isNotNull: true,
		},
		done: {
			type: "BOOL",
			isNotNull: true,
		},
	},
	safeCreating: true,
};

export const TodosT = new Table<Todo>(config);
