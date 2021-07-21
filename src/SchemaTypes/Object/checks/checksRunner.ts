import { ObjectSchemaConfig } from "../types/ObjectSchema";
import * as check from "./allChecks";
import BaseError from "../../types/BaseError";
import { ObjectSchemaErrorEnum as msg } from "../types/ObjectError";
import { KeyValueStore } from "../types/KeyValue";
import SchemaType from "../../class";
import { CheckReturn } from "./type";

const checksRunner = <T extends KeyValueStore = any>(
  x: any,
  config: ObjectSchemaConfig<T>,
  key: string
): {
  value: Partial<T>;
  errors: BaseError[];
} => {
  const { keys: configKeys, pattern: configPattern } = config;

  // type check
  if (!check.type(x))
    return {
      value: x,
      errors: [
        {
          error: `${key} must contain key value pairs`,
          errorType: msg.Type,
        },
      ],
    };

  const transformed: Partial<T> = {};
  const errors: BaseError[] = [];
  const requiredKeys = new Map<keyof T, SchemaType>();
  const defaultKeys = new Map<keyof T, any>();

  if (configKeys && Object.keys(configKeys).length > 0) {
    Object.keys(configKeys).forEach((k: keyof T) => {
      const schema = configKeys[k];

      if (schema && schema.__required && !schema.__default)
        requiredKeys.set(k, schema);
      if (schema && schema.__default) defaultKeys.set(k, schema);
    });
  }

  Object.keys(x).forEach((k: keyof T) => {
    const keyResolution: CheckReturn<T> = {
      resolved: false,
      valid: false,
      value: null,
      errors: [],
    };

    if (configKeys && Object.keys(configKeys).length > 0) {
      const keyCheckResolution = check.key<T>(k, x[k], configKeys);\
      Object.assign(keyResolution, keyCheckResolution)
    }

    if(!keyResolution.resolved && configPattern && configPattern.length > 0) {
      const patternCheckResolution = check.pattern<T>(k, x[k], configPattern)
      Object.assign(keyResolution, patternCheckResolution)
    }

    if(keyResolution.resolved) {
      if (requiredKeys.has(key)) requiredKeys.delete(key);
      if (defaultKeys.has(key)) defaultKeys.delete(key);

      if(keyResolution.valid && keyResolution.value) {
        transformed[k] = keyResolution.value
      }else {
        errors.push(...keyResolution.errors)
      }
    }else {
      errors.push({
        error: `${k} is not allowed`,
        errorType: msg.Keys
      })
    }

  });

  
};

export default checksRunner;
