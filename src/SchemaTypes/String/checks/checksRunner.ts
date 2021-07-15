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
  const { minLength, maxLength, uppercase, lowercase, regex } = config;
  const errors: StringSchemaError[] = [];

  if (!check.type(x)) {
    errors.push({
      error: `${key} must be a string`,
      errorType: msg.Type,
    });
    return errors;
  }

  // length checks
  if (minLength) {
    if (!check.minLength(x, minLength)) {
      errors.push({
        error: `minimum allowed lenght for ${key} is ${minLength}`,
        errorType: msg.Length,
      });
    }
  }
  if (maxLength) {
    if (!check.maxLength(x, maxLength)) {
      errors.push({
        error: `maximum allowed lenght for ${key} is ${maxLength}`,
        errorType: msg.Length,
      });
    }
  }

  // case checks
  if (typeof uppercase !== undefined) {
    const checkResult = check.uppercase(x);
    if (checkResult === false && uppercase === true) {
      errors.push({
        error: `${key} must be all uppercase`,
        errorType: msg.Case,
      });
    }
    if (checkResult === true && uppercase === false) {
      errors.push({
        error: `${key} must not be all uppercase`,
        errorType: msg.Case,
      });
    }
  }
  if (typeof lowercase !== undefined) {
    const checkResult = check.lowercase(x);
    if (checkResult === false && lowercase === true) {
      errors.push({
        error: `${key} must be all lowercase`,
        errorType: msg.Case,
      });
    }
    if (checkResult === true && lowercase === false) {
      errors.push({
        error: `${key} must not be all lowercase`,
        errorType: msg.Case,
      });
    }
  }

  // format check
  if (regex) {
    if (!check.format(x, regex)) {
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
