import { firestore as __firestore } from "firebase-admin";
import { KeyValueStore } from "../../SchemaTypes";
import { ConfigPOJO, Errors } from "../Base";
import operatorsTypeCheck from "./operatorsTypeCheck";
import parseOperators from "./parseOperators";
import makeError from "../../utils/makeError";

const buildQuery = <T extends KeyValueStore>(
  key: keyof ConfigPOJO<T>,
  value: ConfigPOJO<T>[keyof T],
  query: __firestore.Query | __firestore.CollectionReference
): __firestore.Query => {
  if (typeof value === "object" && value !== null) {
    if (Array.isArray(value)) {
      throw makeError(Errors.Invalid, "Arrays are not allowed in query.");
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
