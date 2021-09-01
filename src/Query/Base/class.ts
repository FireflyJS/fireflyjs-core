import { firestore as __firestore } from "firebase-admin";
import { ObjectSchema, KeyValueStore } from "../../SchemaTypes";
import Document from "../../Document";

abstract class BaseQuery<T extends KeyValueStore, K> {
  protected abstract __config: K;

  protected abstract __collectionRef: __firestore.CollectionReference;

  protected abstract __schema: ObjectSchema.Class<T>;

  abstract exec: () => Promise<Document<T> | Document<T>[]>;
}

export default BaseQuery;
