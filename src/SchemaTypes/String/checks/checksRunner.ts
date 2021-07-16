import { StringSchemaConfig } from "../types/StringSchema";
import {
  StringSchemaError,
  StringSchemaErrorEnum as msg,
} from "../types/StringError";
import * as check from "./allChecks";

const checkRunner = (
  x: any,
  config: StringSchemaConfig,
  key: string
): StringSchemaError[] => {
  const {
    trim,
    minLength,
    maxLength,
    uppercase,
    lowercase,
    regex,
    enum: cEnum,
  } = config;
  const errors: StringSchemaError[] = [];

  // type check
  if (!check.type(x)) {
    errors.push({
      error: `${key} must be a string`,
      errorType: msg.Type,
    });
    return errors;
  }

  const str = trim ? x.trim() : x;

  // length checks
  if (minLength && !check.minLength(str, minLength)) {
    errors.push({
      error: `minimum allowed length for ${key} is ${minLength}`,
      errorType: msg.Length,
    });
  }
  if (maxLength && !check.maxLength(str, maxLength)) {
    errors.push({
      error: `maximum allowed length for ${key} is ${maxLength}`,
      errorType: msg.Length,
    });
  }

  // case checks
  if (uppercase && !check.uppercase(str)) {
    errors.push({
      error: `${key} must be all uppercase`,
      errorType: msg.Case,
    });
  }
  if (lowercase && !check.lowercase(str)) {
    errors.push({
      error: `${key} must be all lowercase`,
      errorType: msg.Case,
    });
  }

  // format check
  if (regex && !check.format(str, regex)) {
    const errorMsg = `${key} must be ${
      regex === "email" ? "a valid email" : "of valid format"
    }`;
    errors.push({
      error: errorMsg,
      errorType: msg.Format,
    });
  }

  // enum check
  if (cEnum && !check.enum(str, cEnum)) {
    errors.push({
      error: `${key} is not assignable to specified enum`,
      errorType: msg.Enum,
    });
  }

  return errors;
};

export default checkRunner;
