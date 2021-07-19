import BaseError from "../../types/BaseError";
import { ObjectSchemaConfig } from "../types/ObjectSchema";
import SchemaType from "../../class";
import { ObjectSchemaErrorEnum as msg } from "../types/ObjectError";

type ValidValueTypes =
  | string
  | number
  | boolean
  | Date
  | KeyValueStore
  | ValidValueTypes[];

type KeyValueStore<T = any> = {
  [k in keyof T]: ValidValueTypes;
};

const keysCheck = (
  x: KeyValueStore,
  config: ObjectSchemaConfig
): { value: KeyValueStore; errors: BaseError[] } => {
  const errors: BaseError[] = [];
  const { keys: configKeys } = config;
  if (!configKeys || Object.keys(configKeys).length === 0)
    return { value: x, errors };

  const requiredKeys = new Map<string, SchemaType>();
  const defaultKeys = new Map<string, any>();
  Object.keys(configKeys).forEach((key) => {
    const schema = configKeys[key];
    if (schema && schema.__required && !schema.__default)
      requiredKeys.set(key, schema);

    if (schema && schema.__default) defaultKeys.set(key, schema.__default);
  });

  const transformed: KeyValueStore = {};
  Object.keys(x).forEach((key) => {
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
