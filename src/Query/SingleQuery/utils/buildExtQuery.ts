import { ExtConfigPOJO } from "..";
import { BuildExtQueryFn } from "../../Base";

const buildExtQuery: BuildExtQueryFn<ExtConfigPOJO> = (query, extConfig) => {
  let extendedQuery = query;

  if (extConfig.select) {
    extendedQuery = extendedQuery.select(...extConfig.select);
  }

  return extendedQuery;
};

export { buildExtQuery };
