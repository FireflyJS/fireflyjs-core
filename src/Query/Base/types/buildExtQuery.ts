import { firestore as __firestore } from "firebase-admin";

type BuildExtQueryFn<T> = (
  query: __firestore.Query | __firestore.CollectionReference,
  extConfig: T
) => __firestore.Query;

export { BuildExtQueryFn };
