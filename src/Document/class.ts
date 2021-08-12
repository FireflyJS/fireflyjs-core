/* eslint-disable import/no-cycle */
import { firestore as __firestore } from "firebase-admin";
import { KeyValueStore } from "../SchemaTypes/Object/types/KeyValue";
import { DocErrorTypes as ErrorType } from "./types/error";
import makeError from "../utils/makeError";
import ObjectSchema from "../SchemaTypes/Object/class";

class Document<T extends KeyValueStore = any> {
  private __docRef: __firestore.DocumentReference<T>;

  private __schema: ObjectSchema<T>;

  constructor(
    docRef: __firestore.DocumentReference<T>,
    schema: ObjectSchema<T>
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
      throw makeError(ErrorType.firestore, err.message);
    });

    const docData = docSnap.data();
    if (typeof docData === "undefined" || !docSnap.exists)
      throw makeError(ErrorType.invalid, "Document is empty or non existant");

    return docData;
  };

  public update = async (
    data: Partial<T>,
    options: {
      merge: boolean;
      mergeFields?: string[];
    } = { merge: true }
  ) => {
    const { valid, value, errors } = this.__schema.validate(data, undefined, {
      onlySupplied: true,
    });
    if (!valid) {
      throw makeError(ErrorType.validation, errors);
    }

    this.__docRef.set(value, options);
  };

  public delete = async () => {
    await this.__docRef.delete();
  };
}

export default Document;
