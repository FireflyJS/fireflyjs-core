import { firestore as __firestore } from "firebase-admin";
import { KeyValueStore } from "../SchemaTypes/Object/types/KeyValue";
import ConfigPOJO from "./types/ConfigPOJO";

class Query<T extends KeyValueStore> {
  private __config: ConfigPOJO<T> | undefined = undefined;

  private __queryById: boolean = false;

  private __collectionReference: __firestore.CollectionReference;

  constructor(
    input: ConfigPOJO<T>,
    collectionRef: __firestore.CollectionReference,
    queryById: boolean = false
  ) {
    this.__config = input;
    this.__queryById = queryById;
    this.__collectionReference = collectionRef;
  }

  public exec = () => {
    if (!this.__config) {
      throw new Error("Query not configured");
    }

    if (
      this.__queryById &&
      this.__config["_id"] &&
      typeof this.__config["_id"] === "string"
    ) {
      this.__collectionReference.doc(this.__config["_id"]);
    } else {
      // TODO: iterate over config key-value pair and append where conditions accoridingly
      //   this.__collectionReference.where();
    }
  };
}

export default Query;
