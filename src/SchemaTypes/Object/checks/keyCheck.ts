import { Keys } from "../types/ObjectSchema";
import { KeyValueStore } from "../types/KeyValue";
import { CheckReturn } from "./type";

const keyCheck = <T extends KeyValueStore>(
  key: string,
  value: KeyValueStore[string],
  configKeys: Keys<T>
): CheckReturn<T> => {
  const schema = configKeys[key];
  if (!schema) {
    return {
      resolved: false,
      valid: false,
      value,
      errors: [],
    };
  }

  const {
    valid,
    value: modValue,
    errors,
  } = schema.validate(value, key.toString());

  return {
    resolved: true,
    valid,
    value: modValue,
    errors,
  };
};

export { keyCheck };
