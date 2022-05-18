import { RequestHandler } from "express";
import { validationResult } from "express-validator";

export const validate = <
	Params = undefined,
	Res = undefined,
	Req = undefined
>(): RequestHandler<Params, Res, Req> => {
	return (req, _, next) => {
		try {
			if (validationResult(req).isEmpty()) {
				next();
			}
			validationResult(req).throw();
		} catch (e) {
			next(e);
		}
	};
};
