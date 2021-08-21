import { Keys } from "../types/ObjectSchema";
import { KeyValueStore } from "../types/KeyValue";
import { CheckReturn } from "./type";
import { ValidationOptions } from "../../Base";

const keyCheck = <T extends KeyValueStore>(
  key: string,
  value: KeyValueStore[string],
  configKeys: Keys<T>,
  options: ValidationOptions
): CheckReturn => {
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
  } = schema.validate(value, key.toString(), options);

  return {
    resolved: true,
    valid,
    value: modValue,
    errors,
  };
};

export { keyCheck };
