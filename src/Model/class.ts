/* eslint-disable import/no-cycle */
import { firestore as __firestore } from "firebase-admin";
import Document from "../Document/class";
import { KeyValueStore } from "../SchemaTypes/Object/types/KeyValue";
import ObjectSchema from "../SchemaTypes/Object/class";
import { ModelErrorTypes as ErrorType } from "./types/error";
import makeError from "../utils/makeError";
import Query from "../Query/class";
import ConfigPOJO from "../Query/types/ConfigPOJO";

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
      this.__schema
    );
  };

  public findById = async (id: string) => {
    const collectionRef = this.__db.collection(this.__name);

    // @ts-ignore
    const config: ConfigPOJO<T> = {
      _id: id,
    };

    // config["_id"] = id

    return new Query<T>(config, collectionRef, true);
  };
}

export default Model;
