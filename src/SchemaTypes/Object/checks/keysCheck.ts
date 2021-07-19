import SchemaType from "../../class";
import BaseError from "../../types/BaseError";
import { Keys } from "../types/ObjectSchema";
import { ObjectSchemaErrorEnum as msg } from "../types/ObjectError";
import { KeyValueStore } from "../types/KeyValue";

const keysCheck = <T extends KeyValueStore>(
  x: KeyValueStore<T>,
  configKeys: Keys<T>
): { value: Partial<T>; errors: BaseError[] } => {
  const errors: BaseError[] = [];
  const requiredKeys = new Map<keyof T, SchemaType>();
  const defaultKeys = new Map<keyof T, any>();

  Object.keys(configKeys).forEach((key: keyof T) => {
    const schema = configKeys[key];
    if (schema && schema.__required && !schema.__default)
      requiredKeys.set(key, schema);

    if (schema && schema.__default) defaultKeys.set(key, schema.__default);
  });

  const transformed: Partial<T> = {};
  Object.keys(x).forEach((key: string & keyof T) => {
    const schema = configKeys[key];
    if (schema) {
      const {
        valid,
        value,
        errors: schemaErrors,
      } = schema.validate(x[key], key);

      if (valid) transformed[key] = value;
      else errors.push(...schemaErrors);

      if (requiredKeys.has(key)) requiredKeys.delete(key);

      if (defaultKeys.has(key)) defaultKeys.delete(key);
    } else {
      errors.push({
        error: `${key} is not allowed`,
        errorType: msg.Keys,
      });
    }
  });

  defaultKeys.forEach((value, key) => {
    transformed[key] = value;
  });

  requiredKeys.forEach((_, key) => {
    errors.push({
      error: `${key} is required`,
      errorType: msg.Keys,
    });
  });

  return {
    value: transformed,
    errors,
  };
};

export { keysCheck };
