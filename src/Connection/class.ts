import { firestore as __firestore } from "firebase-admin";
import Model from "../Model";
import { ObjectSchema, KeyValueStore } from "../SchemaTypes";
import { ModelPOJO } from ".";

/**
 * Class for a Firefly connection.
 */
class Connection {
  private __db: __firestore.Firestore;

  private __modelMap: Map<string, Model> = new Map<string, Model>();

  /**
   * Initializes a new connection instance.
   * @constructor
   * @param {__firestore.Firestore} firestore - The [Firestore](https://firebase.google.com/docs/reference/node/firebase.firestore.Firestore) instance to use.
   */
  constructor(firestore: __firestore.Firestore) {
    this.__db = firestore;
  }

  /**
   * A getter function that returns all the models registered with this connection.
   * @returns {ModelPOJO} A javascript POJO(Plain Old Javascript object) model names and their corresponding model instances.
   */
  get models(): ModelPOJO {
    const pojo: ModelPOJO = {};
    this.__modelMap.forEach((val, key) => {
      pojo[key] = val;
    });

    return pojo;
  }

  /**
   * Returns all the models registered with this connection.
   * @returns {string[]} An array containing all the names of models.
   */
  public modelNames = (): string[] => {
    const keys: string[] = [...this.__modelMap.keys()];

    return keys;
  };

  /**
   * Returns an instance of the model corresponding to the provided name
   * @param {string} name - The name of the model.
   * @returns {Model | undefined} Model instance corresponding to `name`. Returns `undefined` if not present.
   */
  public getModel = (name: string): Model | undefined => {
    const model = this.__modelMap.get(name);

    return model;
  };

  /**
   * Registers a new model with the underlying connection.
   * @typeParam T - Type defination of the provided schema, must extend {@link KeyValueStore | KeyValueStore}
   * @param {string} name - Name for the new model. Overwrites the existing model instance under the same name if present.
   * @param {ObjectSchema.Class<T>} schema - The schema for the new model. This schema would be used to validate data before writing to the database.
   * @returns {Model<T>} The new model instance.
   */
  public model = <T extends KeyValueStore>(
    name: string,
    schema: ObjectSchema<T>
  ): Model<T> => {
    const model = new Model<T>(name, schema, this.__db);
    this.__modelMap.set(name, model);

    return model;
  };
}

export default Connection;
