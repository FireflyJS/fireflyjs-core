/* eslint-disable import/no-cycle */
import { firestore as __firestore } from "firebase-admin";
import ObjectSchema from "../SchemaTypes/Object/class";
import Document from "../Document";
import { KeyValueStore } from "../SchemaTypes/Object/types/KeyValue";
import { ConfigPOJO, ExtConfigPOJO, SingleQueryErrorTypes } from "./index";
import makeError from "../utils/makeError";
import buildExtendedQuery from "./utils/buildExtendedQuery";

class SingleQuery<T extends KeyValueStore> {
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

  public select = (...fields: string[]) => {
    this.__extConfig.select = fields;

    return this;
  };

  public exec = async (): Promise<Document<T>> => {
    if (!this.__config) {
      throw new Error("Query not configured");
    }

    if (
      this.__queryById &&
      this.__config["_id"] &&
      typeof this.__config["_id"] === "string"
    ) {
      const docRef = this.__collectionRef.doc(this.__config["_id"]);

      return new Document<T>(
        docRef as __firestore.DocumentReference<T>,
        this.__schema
      );
    }

    let query: __firestore.CollectionReference | __firestore.Query =
      this.__collectionRef;
    Object.keys(this.__config).forEach((k: string) => {
      const key = k as keyof ConfigPOJO<T>;
      query = query.where(key.toString(), "==", this.__config[key]);
    });

    query = buildExtendedQuery(query, this.__extConfig);

    const querySnapshot = await query.get();

    if (querySnapshot.empty) {
      throw makeError(
        SingleQueryErrorTypes.notfound,
        "Document is invalid or not found"
      );
    }
    const documentRef = querySnapshot.docs[0];

    if (typeof documentRef === "undefined") {
      throw makeError(
        SingleQueryErrorTypes.undefined,
        "Document reference is undefined"
      );
    }

    return new Document<T>(
      documentRef.ref as __firestore.DocumentReference<T>,
      this.__schema
    );
  };
}

export default SingleQuery;
