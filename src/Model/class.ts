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

/**
 * Class for Firefly Collection Model.
 * @typeParam T Type defination for Model Schema, must extend {@link KeyValueStore}.
 */
class Model<T extends KeyValueStore = any> {
  private __name: string;

  private __schema: ObjectSchema<T>;

  private __db: __firestore.Firestore;

  /**
   * Intializes a new Model instance.
   * @param name Name of the Model.
   * @param schema {@link ObjectSchema} of the Model.
   * @param firestore {@link __firestore.Firestore | firestore} instance used to initialize Connection.
   */
  constructor(
    name: string,
    schema: ObjectSchema<T>,
    firestore: __firestore.Firestore
  ) {
    this.__name = name;
    this.__schema = schema;
    this.__db = firestore;
  }

  /**
   * Getter for name of the Model.
   * @returns Name of the Model.
   */
  get _name() {
    return this.__name;
  }

  /**
   * Getter for schema of the Model.
   * @returns Schema of the Model.
   */
  get _schema() {
    return this.__schema;
  }

  /**
   * Getter for firestore instance of the Model.
   * @returns Instance of Firestore used in the Connection.
   */
  get _db() {
    return this.__db;
  }

  /**
   *  Create a new Document in the Collection.
   * @param data Data to add to the {@link Document}.
   * @returns Newly created {@link Document} instance.
   */
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

  /**
   * Find a Document in the Collection using it's id.
   * @param id id of the document to find.
   * @returns Instance of {@link SingleQuery | Query}.
   */
  public findById = (id: string) => {
    const collectionRef = this.__db.collection(this.__name);

    const config: BaseQueryNs.ConfigPOJOWithId<T> = {
      _id: id,
    };

    return new SingleQuery<T>(config, collectionRef, this.__schema, true);
  };

  /**
   * Find multiple Documents in the Collection abiding the supplied configuration.
   * @param query Configuration for the Query.
   * @returns Instance of {@link MultipleQuery | Query}.
   */
  public find = (query: BaseQueryNs.ConfigPOJO<T>) => {
    const collectionRef = this.__db.collection(this.__name);

    return new MultipleQuery<T>(query, collectionRef, this.__schema);
  };

  /**
   * Find only one Document abiding the supplied configuration.
   * In case of multiple Documents, this method would return the first Document that matches.
   * @param query Configuration for the Query.
   * @returns Instance of {@link SingleQuery | Query}.
   */
  public findOne = (query: BaseQueryNs.ConfigPOJO<T>) => {
    const collectionRef = this.__db.collection(this.__name);

    return new SingleQuery<T>(query, collectionRef, this.__schema, false);
  };

  /**
   * Find the document that abides the supplied configuration and update the data stored in the same.
   * @param query Configuration of Query.
   * @param updateQuery Data to be stored/updated.
   * @param updateOptions Options related to the update operation. [Read further](https://googleapis.dev/nodejs/firestore/latest/global.html#SetOptions)
   * @returns Instance of {@link UpdateQuery}.
   */

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
