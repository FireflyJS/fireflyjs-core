import { firestore as __firestore } from "firebase-admin";
import BaseQuery, { ConfigPOJO, Errors } from "../Base";
import Document from "../../Document";
import { ObjectSchema, KeyValueStore } from "../../SchemaTypes";
import { ExtConfigPOJO } from ".";
import { buildExtQuery } from "./utils/buildExtQuery";
import buildQuery from "../utils/buildQuery";
import makeError from "../../utils/makeError";

class MultipleQuery<T extends KeyValueStore> extends BaseQuery<
  T,
  ConfigPOJO<T>
> {
  protected __config: ConfigPOJO<T>;

  protected __collectionRef: __firestore.CollectionReference;

  protected __schema: ObjectSchema<T>;

  private __extConfig: ExtConfigPOJO;

  constructor(
    input: ConfigPOJO<T>,
    collectionRef: __firestore.CollectionReference,
    schema: ObjectSchema<T>
  ) {
    super();
    this.__config = input;
    this.__collectionRef = collectionRef;
    this.__schema = schema;
    this.__extConfig = {};
  }

  /**
   * limits the number of documents to be returned
   * @param {number} limit The no of first matching documents to return
   * @returns {this} returns Multiple Query instance
   */
  public limit = (limit: number) => {
    this.__extConfig.limit = limit;

    return this;
  };

  /**
   * Specifies the offset of the returned results.
   * @param {number} offset Offset Number
   * @returns {this} returns Multiple Query instance
   */
  public offset = (offset: number) => {
    this.__extConfig.offset = offset;

    return this;
  };

  /**
   * Starts at the provided set of field values relative to the order of the query.
   * @param {number} value No to startAt relative to the order of the query
   * @returns {this} returns Multiple Query instance
   */
  public startAt = (value: number) => {
    this.__extConfig.startAt = value;

    return this;
  };

  /**
   * sorts by the specified field, optionally in descending order instead of ascending.
   * @param {string[]} fields Comma seperated list of fields to sort by preceded by either '+' or '-' denoting ascending or descending order respectively. If passed none, defaults to ascending order.
   * @returns {this} returns Multiple Query instance
   */
  public orderBy = (...fields: string[]) => {
    this.__extConfig.orderBy = fields;

    return this;
  };

  /**
   * Selects the fields to be included in the final result.
   * @param fields Comma separated list of fields to include in the final result.
   * @returns {this} returns Multiple Query instance
   */
  public select = (...fields: string[]) => {
    this.__extConfig.select = fields;

    return this;
  };

  /**
   * @returns {Promise<Document<T>[]>} returns a promise that resolves to an array of documents
   */
  public exec = async (): Promise<Document<T>[]> => {
    if (!this.__config) {
      throw makeError(Errors.MissingConfig, "Query is not configured.");
    }

    let query: __firestore.CollectionReference | __firestore.Query =
      this.__collectionRef;

    Object.keys(this.__config).forEach((key: keyof ConfigPOJO<T>) => {
      query = buildQuery<T>(key, this.__config[key], query);
    });

    query = buildExtQuery(query, this.__extConfig);

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

export default MultipleQuery;
