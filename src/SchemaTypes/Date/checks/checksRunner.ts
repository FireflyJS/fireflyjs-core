import { DateSchemaConfig } from "../types/DateSchema";
import {
  DateSchemaError,
  DateSchemaErrorEnum as msg,
} from "../types/DateError";
import * as check from "./allChecks";

const checkRunner = (
  x: any,
  config: DateSchemaConfig,
  key: string
): { value: Date; errors: DateSchemaError[] } => {
  const {
    greaterThan,
    greaterThanOrEqualTo,
    lessThan,
    lessThanOrEqualTo,
    equalTo,
  } = config;
  const errors: DateSchemaError[] = [];

  //   type check
  if (!check.type(x)) {
    errors.push({
      error: `${key} must be a Date object`,
      errorType: msg.Type,
    });
    return { value: x, errors };
  }

  //   value check
  if (greaterThan && !check.greaterThan(x, greaterThan)) {
    errors.push({
      error: `${key} must be greater than ${greaterThan}`,
      errorType: msg.Value,
    });
  }
  if (
    greaterThanOrEqualTo &&
    !check.greaterThanOrEqual(x, greaterThanOrEqualTo)
  ) {
    errors.push({
      error: `${key} must be greater than or equal to ${greaterThanOrEqualTo}`,
      errorType: msg.Value,
    });
  }
  if (lessThan && !check.lessThan(x, lessThan)) {
    errors.push({
      error: `${key} must be less than ${lessThan}`,
      errorType: msg.Value,
    });
  }
  if (lessThanOrEqualTo && !check.lessThanOrEqual(x, lessThanOrEqualTo)) {
    errors.push({
      error: `${key} must be less than or equal to ${lessThanOrEqualTo}`,
      errorType: msg.Value,
    });
  }
  if (equalTo && !check.equalTo(x, equalTo)) {
    errors.push({
      error: `${key} must be equal to ${equalTo}`,
      errorType: msg.Value,
    });
  }

  return { value: x, errors };
};

export default checkRunner;
