import { firestore as __firestore } from "firebase-admin";
import { ObjectSchema, KeyValueStore } from "../../SchemaTypes";
import Document from "../../Document";

/**
 * Base Query Class to define the structure of other derived Query classes
 */
abstract class BaseQuery<T extends KeyValueStore, K> {
  protected abstract __config: K;

  protected abstract __collectionRef: __firestore.CollectionReference;

  protected abstract __schema: ObjectSchema<T>;

  /**
   * Executes the query and returns the result
   * @returns {Promise<Document<T> | Document<T>[]> | undefined | void} The result of the query
   */
  abstract exec: () => Promise<Document<T> | Document<T>[] | undefined | void>;
}

export default BaseQuery;
