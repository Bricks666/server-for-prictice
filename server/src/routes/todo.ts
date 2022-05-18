import { TodosController } from "@/controllers";
import { validate } from "@/middlewares";
import { Router } from "express";
import { body, param } from "express-validator";

const isMessage =
	"Id задачи является обязательным параметром и должно быть числом";
export const todoRouter = Router();
todoRouter.get("/", TodosController.getTodos);
todoRouter.post(
	"/",
	body("name")
		.isString()
		.notEmpty()
		.withMessage("Задание должно быть непустой строкой"),
	body("owner")
		.isString()
		.notEmpty()
		.withMessage("Владелец должен быть непустой строкой"),
	body("done")
		.optional()
		.isBoolean({ strict: true })
		.withMessage("Статус должен иметь значение true или false"),
	validate(),
	TodosController.addTodo
);
todoRouter.get(
	"/:todoId",
	param("todoId").isInt({ min: 0 }).withMessage(isMessage),
	validate(),
	TodosController.getTodo
);
todoRouter.put(
	"/:todoId",
	param("todoId").isInt({ min: 0 }).withMessage(isMessage),
	body("name")
		.optional()
		.isString()
		.notEmpty()
		.withMessage("Задание должно быть непустой строкой"),
	body("owner")
		.optional()
		.isString()
		.notEmpty()
		.withMessage("Владелец должен быть непустой строкой"),
	body("done")
		.optional()
		.isBoolean()
		.withMessage("Статус должен иметь значение true или false"),
	validate(),
	TodosController.updateTodo
);
todoRouter.delete(
	"/:todoId",
	param("todoId").isInt({ min: 0 }).withMessage(isMessage),
	validate(),
	TodosController.deleteTodo
);
