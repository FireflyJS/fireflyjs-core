import BaseError from "../../types/BaseError";
import { Errors, Config } from "..";
import * as check from "./allChecks";

const checkRunner = (
  x: any,
  config: Config,
  key: string
): { value: string; errors: BaseError<Errors>[] } => {
  const {
    trim,
    minLength,
    maxLength,
    uppercase,
    lowercase,
    regex,
    enum: cEnum,
  } = config;
  const errors: BaseError<Errors>[] = [];

  // type check
  if (!check.type(x)) {
    errors.push({
      error: `${key} must be a string`,
      errorType: Errors.Type,
    });
    return { value: x, errors };
  }

  // modifications
  let str = x;
  if (trim) str = str.trim();
  if (uppercase) str = str.toUpperCase();
  if (lowercase) str = str.toLowerCase();

  // length checks
  if (minLength && !check.minLength(str, minLength)) {
    errors.push({
      error: `minimum allowed length for ${key} is ${minLength}`,
      errorType: Errors.Length,
    });
  }
  if (maxLength && !check.maxLength(str, maxLength)) {
    errors.push({
      error: `maximum allowed length for ${key} is ${maxLength}`,
      errorType: Errors.Length,
    });
  }

  // case checks
  if (uppercase && !check.uppercase(str)) {
    errors.push({
      error: `${key} must be all uppercase`,
      errorType: Errors.Case,
    });
  }
  if (lowercase && !check.lowercase(str)) {
    errors.push({
      error: `${key} must be all lowercase`,
      errorType: Errors.Case,
    });
  }

  // format check
  if (regex && !check.format(str, regex)) {
    const errorErrors = `${key} must be ${
      regex === "email" ? "a valid email" : "of valid format"
    }`;
    errors.push({
      error: errorErrors,
      errorType: Errors.Format,
    });
  }

  // enum check
  if (cEnum && !check.enum(str, cEnum)) {
    errors.push({
      error: `${key} is not assignable to specified enum`,
      errorType: Errors.Enum,
    });
  }

  return { value: str, errors };
};

export default checkRunner;
