import { firestore as __firestore } from "firebase-admin";
import { KeyValueStore } from "src/SchemaTypes/Object/types/KeyValue";
import ObjectSchema from "../SchemaTypes/Object/class";

class Model<T extends KeyValueStore = any> {
  constructor(
    private __name: string,
    private __schema: ObjectSchema<T>,
    private __db: __firestore.Firestore
  ) {}

  public print = () => {
    console.log(this.__db, this.__name, this.__schema);
  };
}

export default Model;
