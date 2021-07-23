import { firestore as __firestore } from "firebase-admin";
import Document from "../Document/class";
import { KeyValueStore } from "../SchemaTypes/Object/types/KeyValue";
import ObjectSchema from "../SchemaTypes/Object/class";
import { ModelErrorTypes as ErrorType } from "./types/error";
import makeError from "../utils/makeError";

class Model<T extends KeyValueStore = any> {
  private __name: string;

  private __schema: ObjectSchema<T>;

  private __db: __firestore.Firestore;

  constructor(
    name: string,
    schema: ObjectSchema<T>,
    firestore: __firestore.Firestore
  ) {
    this.__name = name;
    this.__schema = schema;
    this.__db = firestore;
  }

  get name() {
    return this.__name;
  }

  get schema() {
    return this.__schema;
  }

  public create = async (data: Partial<T>) => {
    const { valid, value, errors } = this.__schema.validate(data);
    if (!valid) {
      throw makeError(ErrorType.validation, errors);
    }

    const docRef = await this.__db
      .collection(this.__name)
      .add(value)
      .catch((err: Error) => {
        throw makeError(ErrorType.firestore, err.message);
      });

    return new Document<T>(
      docRef as __firestore.DocumentReference<T>,
      this.__name,
      this.__schema
    );
  };
}

export default Model;
