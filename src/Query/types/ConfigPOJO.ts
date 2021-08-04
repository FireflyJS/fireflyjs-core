import { firestore as __firestore } from "firebase-admin";
import { KeyValueStore } from "../../SchemaTypes/Object/types/KeyValue";

type ConfigValues = string | number | boolean | null | __firestore.Timestamp;

type ConfigKeys<T extends KeyValueStore> = keyof T | "_id";

type ConfigPOJO<T extends KeyValueStore> = {
  [k in ConfigKeys<T>]: ConfigValues;
};

export default ConfigPOJO;
