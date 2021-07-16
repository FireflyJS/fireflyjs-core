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
  const { trim, minLength, maxLength, uppercase, lowercase, regex } = config;
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
  if (minLength) {
    if (!check.minLength(str, minLength)) {
      errors.push({
        error: `minimum allowed lenght for ${key} is ${minLength}`,
        errorType: msg.Length,
      });
    }
  }
  if (maxLength) {
    if (!check.maxLength(str, maxLength)) {
      errors.push({
        error: `maximum allowed lenght for ${key} is ${maxLength}`,
        errorType: msg.Length,
      });
    }
  }

  // case checks
  if (uppercase) {
    if (!check.uppercase(str)) {
      errors.push({
        error: `${key} must be all uppercase`,
        errorType: msg.Case,
      });
    }
  }
  if (lowercase) {
    if (!check.lowercase(str)) {
      errors.push({
        error: `${key} must be all lowercase`,
        errorType: msg.Case,
      });
    }
  }

  // format check
  if (regex) {
    if (!check.format(str, regex)) {
      const errorMsg = `${key} must be ${
        regex === "email" ? "a valid email" : "of valid format"
      }`;
      errors.push({
        error: errorMsg,
        errorType: msg.Format,
      });
    }
  }

  return errors;
};

export default checkRunner;
