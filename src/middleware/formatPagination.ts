import { NextFunction, Request, Response } from "express";

const formatPagination = (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsedPage = Number(req.query.page || 1);
    const parsedLimit = Number(req.query.per_page || 10);
    const offset = String((parsedPage - 1) * parsedLimit);
    const formattedQuery = {
      ...req.query,
      offset,
      page: parsedPage.toString(),
      limit: parsedLimit.toString(),
    };

    req.query = formattedQuery;
    next();
  } catch (err) {
    next(err);
  }
};

export default formatPagination;
