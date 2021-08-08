import { firestore as __firestore } from "firebase-admin";
import { ExtConfigPOJO } from "../types/ConfigPOJO";

const buildExtendedQuery = (
  query: __firestore.Query | __firestore.CollectionReference,
  extConfig: ExtConfigPOJO
): __firestore.Query => {
  let extendedQuery = query;
  if (extConfig.startAt) {
    extendedQuery = extendedQuery.startAt(extConfig.startAt);
  }

  if (extConfig.offset) {
    extendedQuery = extendedQuery.startAfter(extConfig.offset);
  }

  if (extConfig.orderBy) {
    extConfig.orderBy.forEach((field: string) => {
      let fieldQuery;
      if (field[0] === "-") {
        fieldQuery = field.replace("-", "");
        extendedQuery = extendedQuery.orderBy(fieldQuery, "desc");
      } else if (field[0] === "+") {
        fieldQuery = field.replace("+", "");
        extendedQuery = extendedQuery.orderBy(fieldQuery, "asc");
      } else {
        extendedQuery = extendedQuery.orderBy(field, "asc");
      }
    });
  }

  if (extConfig.limit) {
    extendedQuery = extendedQuery.limit(extConfig.limit);
  }

  return extendedQuery;
};

export default buildExtendedQuery;
