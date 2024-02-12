import { Request } from "express";
import { QueryResult } from "../../constants/props/QueryResult";
import { SimpleFilter } from "../../constants/props/SimpleFilter";

interface QueryParams {
  page?: string;
  limit?: string;
  from?: string;
  to?: string;
}

const simpleQueryFilter = (
  req: Request<{}, {}, {}, QueryParams>
): QueryResult => {
  const { page = "1", limit = "10", from, to } = req.query;

  let filter: SimpleFilter = {};
  if (from) {
    const date = new Date(from);
    filter.date = { $gte: date };
  }
  if (to) {
    const date = new Date(to);
    filter.date = { ...filter.date, $lte: date };
  }
  const skip = (parseInt(page) - 1) * parseInt(limit);

  return { filter, skip, limit: parseInt(limit) };
};

export default simpleQueryFilter;
