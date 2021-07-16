import { NumberSchemaConfig } from "../types/NumberSchema";
import {
  NumberSchemaError,
  NumberSchemaErrorEnum as msg,
} from "../types/NumberError";
import * as check from "./allChecks";

const checkRunner = (
  x: any,
  config: NumberSchemaConfig,
  key: string
): NumberSchemaError[] => {
  const { integer, min, max, enum: cEnum } = config;
  const errors: NumberSchemaError[] = [];

  // type check
  if (!check.type(x)) {
    errors.push({
      error: `${key} must be a number`,
      errorType: msg.Type,
    });
    return errors;
  }

  // integer check
  if (integer && !check.integer(x)) {
    errors.push({
      error: `${key} must be an integer`,
      errorType: msg.Integer,
    });
  }

  // value check
  if (min && !check.min(x, min)) {
    errors.push({
      error: `minimum allowed value for ${key} is ${min}`,
      errorType: msg.Value,
    });
  }
  if (max && !check.max(x, max)) {
    errors.push({
      error: `maximum allowed value for ${key} is ${max}`,
      errorType: msg.Value,
    });
  }

  // enum check
  if (cEnum && cEnum.length > 0 && !check.enum(x, cEnum)) {
    errors.push({
      error: `${key} is not assignable to specified enum`,
      errorType: msg.Enum,
    });
  }

  return errors;
};

export default checkRunner;
