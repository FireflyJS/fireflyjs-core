import { firestore as __firestore } from "firebase-admin";
import { ExtConfigPOJO } from "../types/ConfigPOJO";

const buildExtendedQuery = (
  query: __firestore.Query | __firestore.CollectionReference,
  extConfig: ExtConfigPOJO
): __firestore.Query => {
  let extendedQuery = query;

  if (extConfig.select) {
    extConfig.select.forEach((field: string) => {
      extendedQuery = extendedQuery.select(field);
    });
  }

  return extendedQuery;
};

export default buildExtendedQuery;
