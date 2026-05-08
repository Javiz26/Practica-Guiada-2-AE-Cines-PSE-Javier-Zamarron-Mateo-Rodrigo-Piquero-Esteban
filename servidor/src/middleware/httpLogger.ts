import { Request, Response, NextFunction } from "express";
import { logger } from "../libs/Logger";
export function httpLogger(req: Request, res: Response, next: NextFunction) {
  const startedAt = Date.now();
  res.on("finish", () => {
    const ms = Date.now() - startedAt;
    const context = {
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      ms,
    };
    if (res.statusCode >= 500) {
      logger.error(context, "request completed with server error");
    } else if (res.statusCode >= 400) {
      logger.warn(context, "request completed with client error");
    } else {
      logger.info(context, "request completed");
    }
  });
  next();
}
