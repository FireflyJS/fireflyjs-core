import { firestore as __firestore } from "firebase-admin";
import ObjectSchema from "../SchemaTypes/Object/class";
import { KeyValueStore } from "../SchemaTypes/Object/types/KeyValue";
import { DocErrorTypes as ErrorType } from "./types/error";
import makeError from "../utils/makeError";

class Document<T extends KeyValueStore = any> {
  private __docRef: __firestore.DocumentReference<T>;

  private __model: string;

  private __schema: ObjectSchema<T>;

  constructor(
    docRef: __firestore.DocumentReference<T>,
    model: string,
    schema: ObjectSchema<T>
  ) {
    this.__docRef = docRef;
    this.__model = model;
    this.__schema = schema;
  }

  get model() {
    return this.__model;
  }

  get schema() {
    return this.__schema;
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
}

export default Document;
