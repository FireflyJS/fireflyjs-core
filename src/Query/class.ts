/* eslint-disable import/no-cycle */
import { firestore as __firestore } from "firebase-admin";
import ObjectSchema from "../SchemaTypes/Object/class";
import Document from "../Document/class";
import { KeyValueStore } from "../SchemaTypes/Object/types/KeyValue";
import { ConfigPOJO, ExtConfigPOJO } from "./types/ConfigPOJO";

class Query<T extends KeyValueStore> {
  private __config: ConfigPOJO<T>;

  private __extConfig: ExtConfigPOJO;

  private __queryById: boolean = false;

  private __collectionRef: __firestore.CollectionReference;

  private __schema: ObjectSchema<T>;

  constructor(
    input: ConfigPOJO<T>,
    collectionRef: __firestore.CollectionReference,
    schema: ObjectSchema<T>,
    queryById: boolean = false
  ) {
    this.__config = input;
    this.__extConfig = {};
    this.__collectionRef = collectionRef;
    this.__schema = schema;
    this.__queryById = queryById;
  }

  public limit = (limit: number) => {
    this.__extConfig.limit = limit;

    return this;
  };

  public offset = (offset: number) => {
    this.__extConfig.offset = offset;

    return this;
  };

  public orderBy = (...fields: string[]) => {
    this.__extConfig.orderBy = fields;

    return this;
  };

  public select = (...fields: string[]) => {
    this.__extConfig.select = fields;

    return this;
  };

  public exec = async (): Promise<Document<T> | Document<T>[]> => {
    if (!this.__config) {
      throw new Error("Query not configured");
    }

    if (
      this.__queryById &&
      this.__config._id &&
      typeof this.__config._id === "string"
    ) {
      const docRef = this.__collectionRef.doc(this.__config._id);

      return new Document<T>(
        docRef as __firestore.DocumentReference<T>,
        this.__schema
      );
    }

    let query: __firestore.CollectionReference | __firestore.Query =
      this.__collectionRef;

    Object.keys(this.__config).forEach((k: string) => {
      const key = k as keyof ConfigPOJO<T>;
      query = query.where(key, "==", this.__config[key]);
    });

    const querySnapshot = await query.get();
    const documents: Document<T>[] = [];

    querySnapshot.forEach((docSnap) => {
      documents.push(
        new Document<T>(
          docSnap.ref as __firestore.DocumentReference<T>,
          this.__schema
        )
      );
    });

    return documents;
  };
}

export default Query;
