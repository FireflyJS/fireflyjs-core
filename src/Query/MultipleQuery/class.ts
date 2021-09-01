import { firestore as __firestore } from "firebase-admin";
import ObjectSchema from "../../SchemaTypes/Object/class";
import Document from "../../Document";
import { KeyValueStore } from "../../SchemaTypes/Object/types/KeyValue";
import { ConfigPOJO, ExtConfigPOJO, QueryErrorTypes } from "./index";
import buildQuery from "./utils/buildQuery";
import makeError from "../../utils/makeError";
import buildExtendedQuery from "./utils/buildExtendedQuery";
import BaseQuery from "../Base/class";

class Query<T extends KeyValueStore> extends BaseQuery<T, ConfigPOJO<T>> {
  protected __config: ConfigPOJO<T>;

  private __extConfig: ExtConfigPOJO;

  protected __collectionRef: __firestore.CollectionReference;

  protected __schema: ObjectSchema<T>;

  constructor(
    input: ConfigPOJO<T>,
    collectionRef: __firestore.CollectionReference,
    schema: ObjectSchema<T>
  ) {
    super();
    this.__config = input;
    this.__extConfig = {};
    this.__collectionRef = collectionRef;
    this.__schema = schema;
  }

  public limit = (limit: number) => {
    this.__extConfig.limit = limit;

    return this;
  };

  public offset = (offset: number) => {
    this.__extConfig.offset = offset;

    return this;
  };

  public startAt = (value: number) => {
    this.__extConfig.startAt = value;

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

  public exec = async (): Promise<Document<T>[]> => {
    if (!this.__config) {
      throw makeError(QueryErrorTypes.invalid, "Query not configured.");
    }

    let query: __firestore.CollectionReference | __firestore.Query =
      this.__collectionRef;

    Object.keys(this.__config).forEach((key: keyof ConfigPOJO<T>) => {
      query = buildQuery<T>(key, this.__config[key], query);
    });

    query = buildExtendedQuery(query, this.__extConfig);

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
