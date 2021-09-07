import { firestore as __firestore } from "firebase-admin";
import Document from "../Document";
import {
  DeleteQuery,
  MultipleQuery,
  SingleQuery,
  UpdateQuery,
  BaseQueryNs,
  UpdateQueryNs,
} from "../Query";
import { KeyValueStore, ObjectSchema } from "../SchemaTypes";
import { Errors } from ".";
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
      throw makeError(Errors.Validation, errors);
    }

    const docRef = await this.__db
      .collection(this.__name)
      .add(value)
      .catch((err: Error) => {
        throw makeError(Errors.Firestore, err.message);
      });

    return new Document<T>(
      docRef as __firestore.DocumentReference<T>,
      this.__schema
    );
  };

  public findById = (id: string) => {
    const collectionRef = this.__db.collection(this.__name);

    const config: BaseQueryNs.ConfigPOJOWithId<T> = {
      _id: id,
    };

    return new SingleQuery<T>(config, collectionRef, this.__schema, true);
  };

  public find = (query: BaseQueryNs.ConfigPOJO<T>) => {
    const collectionRef = this.__db.collection(this.__name);

    return new MultipleQuery<T>(query, collectionRef, this.__schema);
  };

  public findOne = (query: BaseQueryNs.ConfigPOJO<T>) => {
    const collectionRef = this.__db.collection(this.__name);

    return new SingleQuery<T>(query, collectionRef, this.__schema, false);
  };

  public findOneAndUpdate = (
    query: BaseQueryNs.ConfigPOJO<T>,
    updateQuery: UpdateQueryNs.UpdateConfigPOJO<T>,
    updateOptions: UpdateQueryNs.UpdateOptions
  ) => {
    const collectionRef = this.__db.collection(this.__name);

    return new UpdateQuery<T>(
      query,
      collectionRef,
      this.__schema,
      updateQuery,
      updateOptions,
      false
    );
  };

  public findByIdAndUpdate = (
    id: string,
    updateQuery: UpdateQueryNs.UpdateConfigPOJO<T>,
    updateOptions: UpdateQueryNs.UpdateOptions
  ) => {
    const collectionRef = this.__db.collection(this.__name);

    const config: BaseQueryNs.ConfigPOJOWithId<T> = {
      _id: id,
    };

    return new UpdateQuery<T>(
      config,
      collectionRef,
      this.__schema,
      updateQuery,
      updateOptions,
      true
    );
  };

  public findByIdAndDelete = (id: string) => {
    const collectionRef = this.__db.collection(this.__name);

    const config: BaseQueryNs.ConfigPOJOWithId<T> = {
      _id: id,
    };

    return new DeleteQuery<T>(config, collectionRef, this.__schema, true);
  };

  public findOneAndDelete = (query: BaseQueryNs.ConfigPOJO<T>) => {
    const collectionRef = this.__db.collection(this.__name);

    return new DeleteQuery<T>(query, collectionRef, this.__schema, false);
  };
}

export default Model;
