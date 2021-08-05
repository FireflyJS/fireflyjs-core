import { firestore as __firestore } from "firebase-admin";
import { KeyValueStore } from "../../SchemaTypes/Object/types/KeyValue";

type ConfigValues = string | number | boolean | null | __firestore.Timestamp;

type ConfigPOJO<T extends KeyValueStore> =
  | {
      [k in keyof T]: ConfigValues;
    }
  | {
      [k in "_id"]: ConfigValues;
    };

export default ConfigPOJO;
