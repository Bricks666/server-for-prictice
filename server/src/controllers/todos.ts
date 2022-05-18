import { StandardResponse } from "@/interfaces";
import { Todo, TodoCreate } from "@/models";
import { TodosService } from "@/services";
import { createStandardResponse } from "@/utils";
import { RequestHandler } from "express";

interface OwnerQuery {
	readonly owner?: string;
}

interface TodoIdParams {
	readonly todoId: number;
}

export class TodosController {
	static getTodos: RequestHandler<
		undefined,
		StandardResponse<Todo[]>,
		undefined,
		OwnerQuery
	> = async (req, res, next) => {
		try {
			const { owner } = req.query;
			const todos = await TodosService.getTodos(owner);
			res.json(createStandardResponse({ data: todos }));
		} catch (e) {
			next();
		}
	};
	static getTodo: RequestHandler<TodoIdParams, StandardResponse<Todo>> = async (
		req,
		res,
		next
	) => {
		try {
			const { todoId } = req.params;
			const todo = await TodosService.getTodo(todoId);
			res.json(createStandardResponse({ data: todo }));
		} catch (e) {
			next();
		}
	};
	static addTodo: RequestHandler<
		undefined,
		StandardResponse<Todo>,
		TodoCreate
	> = async (req, res, next) => {
		try {
			const create = req.body;
			const todo = await TodosService.addTodo(create);
			res.json(createStandardResponse({ data: todo }));
		} catch (e) {
			next();
		}
	};
	static updateTodo: RequestHandler<
		TodoIdParams,
		StandardResponse<Todo>,
		Partial<TodoCreate>
	> = async (req, res, next) => {
		try {
			const { todoId } = req.params;
			const update = req.body;
			const todo = await TodosService.updateTodo(todoId, update);
			res.json(createStandardResponse({ data: todo }));
		} catch (e) {
			next();
		}
	};
	static deleteTodo: RequestHandler<
		TodoIdParams,
		StandardResponse<TodoIdParams>
	> = async (req, res, next) => {
		try {
			const { todoId } = req.params;
			await TodosService.deleteTodo(todoId);
			res.json(createStandardResponse({ data: { todoId } }));
		} catch (e) {
			next();
		}
	};
}
