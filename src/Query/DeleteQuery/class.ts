import { firestore as __firestore } from "firebase-admin";
import { Class as BaseQuery, ConfigPOJOWithId, Errors } from "../Base";
import Document from "../../Document";
import { ObjectSchema, KeyValueStore } from "../../SchemaTypes";
import buildQuery from "../utils/buildQuery";
import makeError from "../../utils/makeError";

class DeleteQuery<T extends KeyValueStore> extends BaseQuery<
  T,
  ConfigPOJOWithId<T>
> {
  protected __config: ConfigPOJOWithId<T>;

  protected __collectionRef: __firestore.CollectionReference;

  protected __schema: ObjectSchema.Class<T>;

  private __queryById: boolean = false;

  constructor(
    input: ConfigPOJOWithId<T>,
    collectionRef: __firestore.CollectionReference,
    schema: ObjectSchema.Class<T>,
    queryById: boolean = false
  ) {
    super();
    this.__config = input;
    this.__collectionRef = collectionRef;
    this.__schema = schema;
    this.__queryById = queryById;
  }

  /**
   * @returns {Promise<void>} void
   */
  public exec = async (): Promise<void> => {
    if (!this.__config) {
      throw makeError(Errors.MissingConfig, "Query is not configured.");
    }

    let query: __firestore.CollectionReference | __firestore.Query;
    let documentRef: __firestore.DocumentReference<T> | undefined;

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

      Object.keys(this.__config).forEach((k) => {
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

    await document.delete();
  };
}

export default DeleteQuery;
