import { firestore as __firestore } from "firebase-admin";
import Model from "../Model";
import { ObjectSchema, KeyValueStore } from "../SchemaTypes";
import { ModelPOJO } from ".";

class Connection {
  private __db: __firestore.Firestore;

  private __modelMap: Map<string, Model> = new Map<string, Model>();

  constructor(firestore: __firestore.Firestore) {
    this.__db = firestore;
  }

  get models(): ModelPOJO {
    const pojo: ModelPOJO = {};
    this.__modelMap.forEach((val, key) => {
      pojo[key] = val;
    });

    return pojo;
  }

  public modelNames = (): string[] => {
    const keys: string[] = [...this.__modelMap.keys()];

    return keys;
  };

  public getModel = (name: string): Model | undefined => {
    const model = this.__modelMap.get(name);

    return model;
  };

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
