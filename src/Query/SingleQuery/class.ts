import { firestore as __firestore } from "firebase-admin";
import ObjectSchema from "../../SchemaTypes/Object/class";
import Document from "../../Document";
import { KeyValueStore } from "../../SchemaTypes/Object/types/KeyValue";
import { ExtConfigPOJO, SingleQueryErrorTypes } from "./index";
import makeError from "../../utils/makeError";
import buildExtendedQuery from "./utils/buildExtendedQuery";
import { QueryConfigPOJO } from "../MultipleQuery/types/ConfigPOJO";
import BaseQuery from "../Base/class";

class SingleQuery<T extends KeyValueStore> extends BaseQuery<
  T,
  QueryConfigPOJO<T>
> {
  protected __config: QueryConfigPOJO<T>;

  private __extConfig: ExtConfigPOJO;

  private __queryById: boolean = false;

  protected __collectionRef: __firestore.CollectionReference;

  protected __schema: ObjectSchema<T>;

  constructor(
    input: QueryConfigPOJO<T>,
    collectionRef: __firestore.CollectionReference,
    schema: ObjectSchema<T>,
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
  public exec = async (): Promise<Document<T>> => {
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
      const key = k as keyof QueryConfigPOJO<T>;
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
