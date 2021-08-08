import { firestore as __firestore } from "firebase-admin";
import { KeyValueStore } from "../../SchemaTypes/Object/types/KeyValue";
import { ConfigPOJO } from "../types/ConfigPOJO";
import operatorsTypeCheck from "./operatorsTypeCheck";

const buildQuery = <T extends KeyValueStore>(
  key: keyof ConfigPOJO<T>,
  value: ConfigPOJO<T>[keyof T],
  query: __firestore.Query | __firestore.CollectionReference
): __firestore.Query => {
  if (typeof value === "object" && value !== null) {
    if (Array.isArray(value)) {
      throw new Error("Array not supported, use operators");
    }

    if (value instanceof Date) {
      return query.where(
        key.toString(),
        "==",
        __firestore.Timestamp.fromDate(value)
      );
    }

    if (operatorsTypeCheck(value)) {
      // Parse operators
    }

    // Flatten KeyValueStore and buildQuery recursively
  }

  return query.where(key.toString(), "==", value);
};

export default buildQuery;
