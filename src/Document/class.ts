import { firestore as __firestore } from "firebase-admin";
import { ObjectSchema, KeyValueStore } from "../SchemaTypes";
import { Errors, UpdateOptions } from ".";
import makeError from "../utils/makeError";

class Document<T extends KeyValueStore = any> {
  private __docRef: __firestore.DocumentReference<T>;

  private __schema: ObjectSchema.Class<T>;

  constructor(
    docRef: __firestore.DocumentReference<T>,
    schema: ObjectSchema.Class<T>
  ) {
    this.__docRef = docRef;
    this.__schema = schema;
  }

  get schema() {
    return this.__schema;
  }

  get id() {
    return this.__docRef.id;
  }

  public data = async () => {
    const docSnap = await this.__docRef.get().catch((err: Error) => {
      throw makeError(Errors.Firestore, err.message);
    });

    const docData = docSnap.data();
    if (typeof docData === "undefined" || !docSnap.exists)
      throw makeError(Errors.Invalid, "Document is empty or non existant");

    return docData;
  };

  public update = async (
    data: Partial<T>,
    options: UpdateOptions = { merge: true }
  ) => {
    const { valid, value, errors } = this.__schema.validate(data, undefined, {
      onlySupplied: true,
    });
    if (!valid) {
      throw makeError(Errors.Validation, errors);
    }

    this.__docRef.set(value, options);
  };

  public delete = async () => {
    await this.__docRef.delete();
  };
}

export default Document;
