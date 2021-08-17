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
   * @param {__firestore.Firestore} firestore - The Firestore instance to use.
   */
  constructor(firestore: __firestore.Firestore) {
    this.__db = firestore;
  }

  /**
   * returns all the models initialized in this connection.
   * @returns {ModelPOJO} An object containing all the names of models as key and its instance as value.
   */
  get models(): ModelPOJO {
    const pojo: ModelPOJO = {};
    this.__modelMap.forEach((val, key) => {
      pojo[key] = val;
    });

    return pojo;
  }

  /**
   * returns all the models initialized in this connection.
   * @returns {string[]} An array containing all the names of models.
   */
  public modelNames = (): string[] => {
    const keys: string[] = [...this.__modelMap.keys()];

    return keys;
  };

  /**
   * returns an instance of the model corresponding to the provided name
   * @param {string} name - The name of the model to return.
   * @returns {Model | undefined} The model instance.
   */
  public getModel = (name: string): Model | undefined => {
    const model = this.__modelMap.get(name);

    return model;
  };

  /**
   * Creates an instance of the model corresponding to the provided name and schema.
   * @param {string} name - The name of the model to create.
   * @param {ObjectSchema.Class<T>} schema - The schema to use for the model.
   * @returns {Model<T>} The model instance.
   */
  public model = <T extends KeyValueStore>(
    name: string,
    schema: ObjectSchema.Class<T>
  ): Model<T> => {
    const model = new Model<T>(name, schema, this.__db);
    this.__modelMap.set(name, model);

    return model;
  };
}

export default Connection;
