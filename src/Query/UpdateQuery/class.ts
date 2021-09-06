import { firestore as __firestore } from "firebase-admin";
import BaseQuery, { ConfigPOJOWithId, Errors } from "../Base";
import Document from "../../Document";
import { ObjectSchema, KeyValueStore } from "../../SchemaTypes";
import { UpdateOptions, UpdateConfigPOJO } from ".";
import buildQuery from "../utils/buildQuery";
import makeError from "../../utils/makeError";

class UpdateQuery<T extends KeyValueStore> extends BaseQuery<
  T,
  ConfigPOJOWithId<T>
> {
  protected __config: ConfigPOJOWithId<T>;

  protected __collectionRef: __firestore.CollectionReference;

  protected __schema: ObjectSchema.Class<T>;

  private __updateConfig: UpdateConfigPOJO<T>;

  private __updateOptions: UpdateOptions;

  private __queryById: boolean = false;

  constructor(
    input: ConfigPOJOWithId<T>,
    collectionRef: __firestore.CollectionReference,
    schema: ObjectSchema.Class<T>,
    updateConfig: UpdateConfigPOJO<T>,
    updateOptions: UpdateOptions,
    queryById: boolean = false
  ) {
    super();
    this.__config = input;
    this.__collectionRef = collectionRef;
    this.__schema = schema;
    this.__updateConfig = updateConfig;
    this.__updateOptions = updateOptions;
    this.__queryById = queryById;
  }

  public exec = async (): Promise<Document<T>> => {
    if (!this.__config) {
      throw makeError(Errors.MissingConfig, "Query is not configured.");
    }

    if (!this.__updateConfig) {
      throw makeError(
        Errors.MissingUpdateConfig,
        "No data is provided to update."
      );
    }

    let query: __firestore.CollectionReference | __firestore.Query;
    let documentRef: __firestore.DocumentReference<T>;

    if (
      this.__queryById &&
      this.__config._id &&
      typeof this.__config._id === "string"
    ) {
      documentRef = this.__collectionRef.doc(
        this.__config._id
      ) as __firestore.DocumentReference<T>;
    } else {
      query = this.__collectionRef;

      Object.keys(this.__config).forEach((k: string) => {
        const key = k as keyof ConfigPOJOWithId<T>;

        if (key !== "_id") {
          query = buildQuery<T>(key, this.__config[key], query);
        }
      });

      const querySnapshot = await query.get();

      documentRef = querySnapshot.docs[0]
        ?.ref as __firestore.DocumentReference<T>;
    }

    if (typeof documentRef === "undefined") {
      throw makeError(Errors.NotFound, "No document found matching the query.");
    }

    const document = new Document<T>(documentRef, this.__schema);

    await document.update(this.__updateConfig, this.__updateOptions);

    return document;
  };
}

export default UpdateQuery;
