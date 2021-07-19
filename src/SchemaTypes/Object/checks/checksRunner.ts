import { ObjectSchemaConfig } from "../types/ObjectSchema";
import * as check from "./allChecks";
import BaseError from "../../types/BaseError";
import { ObjectSchemaErrorEnum as msg } from "../types/ObjectError";
import { KeyValueStore } from "../types/KeyValue";

const checksRunner = <T extends KeyValueStore = any>(
  x: any,
  config: ObjectSchemaConfig<T>,
  key: string
): {
  value: Partial<T>;
  errors: BaseError[];
} => {
  const { keys } = config;
  const transformed: Partial<T> = {};
  const errors: BaseError[] = [];

  // type check
  if (!check.type<T>(x))
    return {
      value: x,
      errors: [
        {
          error: `${key} must contain key value pairs`,
          errorType: msg.Type,
        },
      ],
    };

  // keys check
  if (keys && Object.keys(keys).length !== 0) {
    const { value, errors: keySchemaErrors } = check.keys(x, keys);
    Object.assign(transformed, value);
    errors.push(...keySchemaErrors);
  }

  return {
    value: transformed,
    errors,
  };
};

export default checksRunner;
