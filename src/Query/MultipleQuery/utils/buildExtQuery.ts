import { ExtConfigPOJO } from "..";
import { BuildExtQueryFn } from "../../Base";

const buildExtQuery: BuildExtQueryFn<ExtConfigPOJO> = (query, extConfig) => {
  let extendedQuery = query;

  if (extConfig.startAt) {
    extendedQuery = extendedQuery.startAt(extConfig.startAt);
  }

  if (extConfig.offset) {
    extendedQuery = extendedQuery.offset(extConfig.offset);
  }

  if (extConfig.orderBy) {
    extConfig.orderBy.forEach((field: string) => {
      if (field[0] === "-") {
        const key = field.replace("-", "");
        extendedQuery = extendedQuery.orderBy(key, "desc");
      } else if (field[0] === "+") {
        const key = field.replace("+", "");
        extendedQuery = extendedQuery.orderBy(key, "asc");
      } else {
        extendedQuery = extendedQuery.orderBy(field, "asc");
      }
    });
  }

  if (extConfig.select) {
    extendedQuery = extendedQuery.select(...extConfig.select);
  }

  if (extConfig.limit) {
    extendedQuery = extendedQuery.limit(extConfig.limit);
  }

  return extendedQuery;
};

export { buildExtQuery };
