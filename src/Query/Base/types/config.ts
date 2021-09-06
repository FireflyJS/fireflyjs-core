import { Operators } from "..";
import { KeyValueStore } from "../../../SchemaTypes";

type ConfigPOJO<T extends KeyValueStore> = {
  [k in keyof T]?: Partial<T[k]> | Operators;
};

type ConfigPOJOWithId<T extends KeyValueStore> =
  | ConfigPOJO<T>
  | {
      _id: string;
    };

export { ConfigPOJO, ConfigPOJOWithId };
