import { firestore as __firestore } from "firebase-admin";
import { KeyValueStore } from "../../SchemaTypes/Object/types/KeyValue";
import makeError from "../../utils/makeError";
import { ConfigPOJO } from "../types/ConfigPOJO";
import { QueryErrorTypes } from "../types/error";
import operatorsTypeCheck from "./operatorsTypeCheck";
import parseOperators from "./parseOperators";

const buildQuery = <T extends KeyValueStore>(
  key: keyof ConfigPOJO<T>,
  value: ConfigPOJO<T>[keyof T],
  query: __firestore.Query | __firestore.CollectionReference
): __firestore.Query => {
  if (typeof value === "object" && value !== null) {
    if (Array.isArray(value)) {
      throw makeError(
        QueryErrorTypes.invalid,
        "Arrays are not allowed in query."
      );
    }

    if (value instanceof Date) {
      return query.where(
        key.toString(),
        "==",
        __firestore.Timestamp.fromDate(value)
      );
    }

    if (operatorsTypeCheck(value)) {
      return parseOperators(key, value, query);
    }

    // Flatten KeyValueStore and buildQuery recursively
  }

  return query.where(key.toString(), "==", value);
};

export default buildQuery;
