import { BooleanSchemaConfig } from "../types/BooleanSchema";
import {
  BooleanSchemaError,
  BooleanSchemaErrorEnum as msg,
} from "../types/BooleanError";
import * as check from "./allChecks";

const checkRunner = (
  x: any,
  config: BooleanSchemaConfig,
  key: string
): {
  value: boolean;
  errors: BooleanSchemaError[];
} => {
  const { strict } = config;
  const errors: BooleanSchemaError[] = [];

  let val = x;
  if (!strict) val = Boolean(val);

  // type check
  if (!check.type(val)) {
    errors.push({
      error: `${key} must be a boolean`,
      errorType: msg.Type,
    });
    return { value: val, errors };
  }

  return { value: val, errors };
};

export default checkRunner;
