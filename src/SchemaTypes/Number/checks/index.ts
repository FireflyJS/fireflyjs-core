import BaseError from "../../types/BaseError";
import { Errors, Config } from "..";
import * as check from "./allChecks";

const checkRunner = (
  x: any,
  config: Config,
  key: string
): { value: number; errors: BaseError<Errors>[] } => {
  const { integer, min, max, enum: cEnum } = config;
  const errors: BaseError<Errors>[] = [];

  // type check
  if (!check.type(x)) {
    errors.push({
      error: `${key} must be a number`,
      errorType: Errors.Type,
    });
    return { value: x, errors };
  }

  // integer check
  if (integer && !check.integer(x)) {
    errors.push({
      error: `${key} must be an integer`,
      errorType: Errors.Integer,
    });
  }

  // value check
  if (min && !check.min(x, min)) {
    errors.push({
      error: `minimum allowed value for ${key} is ${min}`,
      errorType: Errors.Value,
    });
  }
  if (max && !check.max(x, max)) {
    errors.push({
      error: `maximum allowed value for ${key} is ${max}`,
      errorType: Errors.Value,
    });
  }

  // enum check
  if (cEnum && cEnum.length > 0 && !check.enum(x, cEnum)) {
    errors.push({
      error: `${key} is not assignable to specified enum`,
      errorType: Errors.Enum,
    });
  }

  return { value: x, errors };
};

export default checkRunner;
