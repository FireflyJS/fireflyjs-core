import { firestore as __firestore } from "firebase-admin";
import buildQuery from "../utils/buildQuery";
import makeError from "../../utils/makeError";
import Document from "../../Document";
import ObjectSchema from "../../SchemaTypes/Object/class";
import { KeyValueStore } from "../../SchemaTypes/Object/types/KeyValue";
import {
  UpdateConfigPOJO,
  UpdateQueryErrorTypes,
  UpdateOptions,
} from "./index";
import { ConfigPOJO } from "./types/ConfigPOJO";
import { QueryConfigPOJO } from "../MultipleQuery/types/ConfigPOJO";
import BaseQuery from "../Base/class";

class UpdateQuery<T extends KeyValueStore> extends BaseQuery<
  T,
  QueryConfigPOJO<T>
> {
  protected __config: QueryConfigPOJO<T>;

  private __updateConfig: UpdateConfigPOJO<T>;

  private __updateOptions: UpdateOptions;

  private __queryById: boolean = false;

  protected __collectionRef: __firestore.CollectionReference;

  protected __schema: ObjectSchema<T>;

  constructor(
    input: QueryConfigPOJO<T>,
    updateConfig: UpdateConfigPOJO<T>,
    updateOptions: UpdateOptions,
    collectionRef: __firestore.CollectionReference,
    schema: ObjectSchema<T>,
    queryById: boolean = false
  ) {
    super();
    this.__config = input;
    this.__updateConfig = updateConfig;
    this.__updateOptions = updateOptions;
    this.__collectionRef = collectionRef;
    this.__schema = schema;
    this.__queryById = queryById;
  }

  public exec = async (): Promise<Document<T>> => {
    if (!this.__config) {
      throw makeError(UpdateQueryErrorTypes.invalid, "Query not configured");
    }

    if (!this.__updateConfig) {
      throw makeError(UpdateQueryErrorTypes.invalid, "Update not configured");
    }

    let query: __firestore.CollectionReference | __firestore.Query;
    let documentRef: any;

    if (
      this.__queryById &&
      this.__config._id &&
      typeof this.__config._id === "string"
    ) {
      documentRef = this.__collectionRef.doc(this.__config._id);
    } else {
      query = this.__collectionRef;

      Object.keys(this.__config).forEach((k: string) => {
        const key = k as keyof QueryConfigPOJO<T>;

        query = buildQuery<T>(
          key.toString(),
          this.__config[key] as ConfigPOJO<T>,
          query
        );
      });

      const querySnapshot = await query.get();

      documentRef = querySnapshot
        .docs[0] as __firestore.QueryDocumentSnapshot<__firestore.DocumentData>;
    }

    if (typeof documentRef === "undefined") {
      throw makeError(
        UpdateQueryErrorTypes.undefined,
        "Document reference is undefined"
      );
    }

    const document = new Document<T>(
      this.__config._id
        ? documentRef
        : (documentRef.ref as __firestore.DocumentReference<T>),
      this.__schema
    );

    await document.update(this.__updateConfig, this.__updateOptions);

    return document;
  };
}

export default UpdateQuery;
