import { firestore as __firestore } from "firebase-admin";
import Document from "../../Document";
import BaseQuery, { ConfigPOJOWithId, Errors } from "../Base";
import { ExtConfigPOJO } from ".";
import { ObjectSchema, KeyValueStore } from "../../SchemaTypes";
import { buildExtQuery } from "./utils/buildExtQuery";
import makeError from "../../utils/makeError";
import buildQuery from "../utils/buildQuery";

class SingleQuery<T extends KeyValueStore> extends BaseQuery<
  T,
  ConfigPOJOWithId<T>
> {
  protected __config: ConfigPOJOWithId<T>;

  protected __collectionRef: __firestore.CollectionReference;

  protected __schema: ObjectSchema.Class<T>;

  private __extConfig: ExtConfigPOJO;

  private __queryById: boolean = false;

  constructor(
    input: ConfigPOJOWithId<T>,
    collectionRef: __firestore.CollectionReference,
    schema: ObjectSchema.Class<T>,
    queryById: boolean = false
  ) {
    super();
    this.__config = input;
    this.__extConfig = {};
    this.__collectionRef = collectionRef;
    this.__schema = schema;
    this.__queryById = queryById;
  }

  /**
   * Selects the fields to be included in the final result.
   * @param fields Comma separated list of fields to include in the final result.
   * @returns {this} returns Single Query instance
   */
  public select = (...fields: string[]) => {
    this.__extConfig.select = fields;

    return this;
  };

  /**
   * @returns {Promise<Document<T>>} returns a promise that resolves to a single document
   */
  exec = async (): Promise<Document<T> | undefined> => {
    if (!this.__config) {
      throw makeError(Errors.MissingConfig, "Query is not configured.");
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

    Object.keys(this.__config).forEach((k) => {
      const key = k as keyof ConfigPOJOWithId<T>;
      if (key !== "_id") {
        query = buildQuery(key, this.__config[key], query);
      }
    });

    query = buildExtQuery(query, this.__extConfig);

    const querySnapshot = await query.get();

    if (querySnapshot.empty) {
      return undefined;
    }
    const documentRef = querySnapshot.docs[0];

    if (typeof documentRef === "undefined") {
      return undefined;
    }

    return new Document<T>(
      documentRef.ref as __firestore.DocumentReference<T>,
      this.__schema
    );
  };
}

export default SingleQuery;
