import { KeyValueStore } from "../../../SchemaTypes";

type UpdateConfigPOJO<T extends KeyValueStore> = {
  [k in keyof T]?: T[k];
};

export { UpdateConfigPOJO };
