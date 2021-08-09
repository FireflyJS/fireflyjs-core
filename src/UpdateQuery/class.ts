import { firestore as __firestore } from "firebase-admin";
import buildQuery from "../Query/utils/buildQuery";
import makeError from "../utils/makeError";
import Document from "../Document/class";
import ObjectSchema from "../SchemaTypes/Object/class";
import { KeyValueStore } from "../SchemaTypes/Object/types/KeyValue";
import { ConfigPOJO, UpdateConfigPOJO } from "./types/ConfigPOJO";
import { UpdateQueryErrorTypes } from "./types/error";
import { UpdateOptions } from "./types/UpdateOptions";

class UpdateQuery<T extends KeyValueStore> {
  private __config: ConfigPOJO<T>;

  private __updateConfig: UpdateConfigPOJO<T>;

  private __updateOptions: UpdateOptions;

  private __queryById: boolean = false;

  private __collectionRef: __firestore.CollectionReference;

  private __schema: ObjectSchema<T>;

  constructor(
    input: ConfigPOJO<T>,
    updateConfig: UpdateConfigPOJO<T>,
    updaetOptions: UpdateOptions,
    collectionRef: __firestore.CollectionReference,
    schema: ObjectSchema<T>,
    queryById: boolean = false
  ) {
    this.__config = input;
    this.__updateConfig = updateConfig;
    this.__updateOptions = updaetOptions;
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
      this.__config["_id"] &&
      typeof this.__config["_id"] === "string"
    ) {
      documentRef = this.__collectionRef.doc(this.__config["_id"]);
    } else {
      query = this.__collectionRef;

      Object.keys(this.__config).forEach((key: keyof ConfigPOJO<T>) => {
        query = buildQuery<T>(key, this.__config[key], query);
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
      documentRef.ref as __firestore.DocumentReference<T>,
      this.__schema
    );

    document.update(this.__updateConfig, this.__updateOptions);

    return document;
  };
}

export default UpdateQuery;
