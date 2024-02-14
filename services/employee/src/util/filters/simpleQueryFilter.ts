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
    const fromDate = new Date(from);
    fromDate.setHours(0, 0, 0, 0);
    filter.date = { ...filter.date, $gte: fromDate };
  }
  if (to) {
    const toDate = new Date(to);
    toDate.setHours(23, 59, 59, 999);
    filter.date = { ...filter.date, $lte: toDate };
  }
  const skip = (parseInt(page) - 1) * parseInt(limit);

  return { filter, skip, limit: parseInt(limit) };
};

export default simpleQueryFilter;
