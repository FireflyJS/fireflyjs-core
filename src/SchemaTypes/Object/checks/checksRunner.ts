import { ObjectSchemaConfig } from "../types/ObjectSchema";
import * as check from "./allChecks";
import BaseError from "../../types/BaseError";
import { ObjectSchemaErrorEnum as msg } from "../types/ObjectError";
import { KeyValueStore } from "../types/KeyValue";
import SchemaType from "../../class";
import { CheckReturn } from "./type";
import { Options } from "../../types/ValidateFn";

const checksRunner = <T extends KeyValueStore = any>(
  x: any,
  config: ObjectSchemaConfig<T>,
  key: string,
  options: Options
): {
  value: Partial<T>;
  errors: BaseError[];
} => {
  const { keys: configKeys, pattern: configPattern } = config;

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

  if (
    configKeys &&
    Object.keys(configKeys).length > 0 &&
    !options.onlySupplied
  ) {
    Object.keys(configKeys).forEach((k: keyof T) => {
      const schema = configKeys[k];

      if (schema && schema.__required && !schema.__default)
        requiredKeys.set(k, schema);
      if (schema && schema.__default) defaultKeys.set(k, schema.__default);
    });
  }

  Object.keys(x).forEach((k: string) => {
    const keyResolution: CheckReturn = {
      resolved: false,
      valid: false,
      value: null,
      errors: [],
    };

    if (configKeys && Object.keys(configKeys).length > 0) {
      const keyCheckResolution = check.key<T>(k, x[k]!, configKeys);
      Object.assign(keyResolution, keyCheckResolution);
    }

    if (
      !options.onlyKeys &&
      !keyResolution.resolved &&
      configPattern &&
      configPattern.length === 2
    ) {
      const patternCheckResolution = check.pattern(k, x[k]!, configPattern);
      Object.assign(keyResolution, patternCheckResolution);
    }

    if (keyResolution.resolved) {
      if (!options.onlySupplied) {
        if (requiredKeys.has(k)) requiredKeys.delete(k);
        if (defaultKeys.has(k)) defaultKeys.delete(k);
      }
      if (!keyResolution.valid) errors.push(...keyResolution.errors);

      // @ts-ignore
      transformed[k] = keyResolution.value;
    } else {
      errors.push({
        error: `${k} is not allowed`,
        errorType: msg.Keys,
      });
    }
  });

  if (!options.onlySupplied) {
    defaultKeys.forEach((v, k) => {
      transformed[k] = v;
    });

    requiredKeys.forEach((_, k) => {
      errors.push({
        error: `${k} is required`,
        errorType: msg.Keys,
      });
    });
  }

  return {
    value: transformed,
    errors,
  };
};

export default checksRunner;
