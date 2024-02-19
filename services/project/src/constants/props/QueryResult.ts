import { SimpleFilter } from "./SimpleFilter";

export interface QueryResult {
  filter: SimpleFilter;
  skip: number;
  limit: number;
}
