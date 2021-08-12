/* eslint-disable import/no-cycle */
import { firestore as __firestore } from "firebase-admin";
import Document from "../Document/class";
import { KeyValueStore } from "../SchemaTypes/Object/types/KeyValue";
import ObjectSchema from "../SchemaTypes/Object/class";
import { ModelErrorTypes as ErrorType } from "./types/error";
import makeError from "../utils/makeError";
import Query from "../Query/class";
import SingleQuery from "../SingleQuery/class";
import { ConfigPOJO } from "../Query/types/ConfigPOJO";
import { UpdateConfigPOJO } from "../UpdateQuery/types/ConfigPOJO";
import UpdateQuery from "../UpdateQuery/class";
import { UpdateOptions } from "../UpdateQuery/types/UpdateOptions";
import DeleteQuery from "../DeleteQuery/class";

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

  get _name() {
    return this.__name;
  }

  get _schema() {
    return this.__schema;
  }

  get _db() {
    return this.__db;
  }

  public create = async (data: Partial<T>) => {
    const { valid, value, errors } = this.__schema.validate(data, undefined, {
      onlyKeys: true,
    });
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

  public findById = (id: string) => {
    const collectionRef = this.__db.collection(this.__name);

    // @ts-ignore
    const config: ConfigPOJO<T> = {
      _id: id,
    };

    // @ts-ignore
    return new SingleQuery<T>(config, collectionRef, this.__schema, true);
  };

  public find = (query: ConfigPOJO<T>) => {
    const collectionRef = this.__db.collection(this.__name);

    return new Query<T>(query, collectionRef, this.__schema);
  };

  public findOne = (query: ConfigPOJO<T>) => {
    const collectionRef = this.__db.collection(this.__name);

    // @ts-ignore
    return new SingleQuery<T>(query, collectionRef, this.__schema, false);
  };

  public findOneAndUpdate = (
    query: ConfigPOJO<T>,
    updateQuery: UpdateConfigPOJO<T>,
    updateOptions: UpdateOptions
  ) => {
    const collectionRef = this.__db.collection(this.__name);

    return new UpdateQuery<T>(
      query,
      updateQuery,
      updateOptions,
      collectionRef,
      this.__schema,
      false
    );
  };

  public findByIdAndUpdate = (
    id: string,
    updateQuery: UpdateConfigPOJO<T>,
    updateOptions: UpdateOptions
  ) => {
    const collectionRef = this.__db.collection(this.__name);

    // @ts-ignore
    const config: ConfigPOJO<T> = {
      _id: id,
    };

    return new UpdateQuery<T>(
      config,
      updateQuery,
      updateOptions,
      collectionRef,
      this.__schema,
      true
    );
  };

  public findByIdAndDelete = (id: string) => {
    const collectionRef = this.__db.collection(this.__name);

    // @ts-ignore
    const config: ConfigPOJO<T> = {
      _id: id,
    };

    return new DeleteQuery<T>(config, collectionRef, this.__schema, true);
  };

  public findOneAndDelete = (query: ConfigPOJO<T>) => {
    const collectionRef = this.__db.collection(this.__name);

    return new DeleteQuery<T>(query, collectionRef, this.__schema, false);
  };
}

export default Model;
