import { firestore as __firestore } from "firebase-admin";
import { ConfigPOJO } from "src/Query/SingleQuery/types/ConfigPOJO";
import { KeyValueStore } from "../../../SchemaTypes/Object/types/KeyValue";
import { Operators } from "../types/ConfigPOJO";
import convertDate from "./convertDate";

const parseOperators = <T extends KeyValueStore>(
  key: keyof ConfigPOJO<T>,
  value: Operators,
  query: __firestore.Query
): __firestore.Query => {
  let constructedQuery: __firestore.Query = query;

  if (value.$gt) {
    constructedQuery = constructedQuery.where(
      key.toString(),
      ">",
      convertDate(value.$gt)
    );
  }

  if (value.$lt) {
    constructedQuery = constructedQuery.where(
      key.toString(),
      "<",
      convertDate(value.$lt)
    );
  }

  if (value.$gte) {
    constructedQuery = constructedQuery.where(
      key.toString(),
      ">=",
      convertDate(value.$gte)
    );
  }

  if (value.$lte) {
    constructedQuery = constructedQuery.where(
      key.toString(),
      "<=",
      convertDate(value.$lte)
    );
  }

  if (value.$eq) {
    constructedQuery = constructedQuery.where(
      key.toString(),
      "==",
      convertDate(value.$eq)
    );
  }

  if (value.$neq) {
    constructedQuery = constructedQuery.where(
      key.toString(),
      "!=",
      convertDate(value.$neq)
    );
  }

  if (value.$ctn) {
    constructedQuery = constructedQuery.where(
      key.toString(),
      Array.isArray(value.$ctn) ? "array-contains-any" : "array-contains",
      convertDate(value.$ctn)
    );
  }

  if (value.$in) {
    constructedQuery = constructedQuery.where(
      key.toString(),
      "in",
      convertDate(value.$in)
    );
  }

  if (value.$nin) {
    constructedQuery = constructedQuery.where(
      key.toString(),
      "not-in",
      convertDate(value.$nin)
    );
  }

  return constructedQuery;
};

export default parseOperators;
