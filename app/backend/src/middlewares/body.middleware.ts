import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

export const bodyMiddleware = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.safeParse(req.body);

    if (!validation.success) {
      validation.error.errors
      return res
        .status(400)
        .json({
          message: "All fields must be filled",
          error: validation.error.formErrors
        });
    }

    validation.data

    req.body = validation.data

    return next();
  }};
