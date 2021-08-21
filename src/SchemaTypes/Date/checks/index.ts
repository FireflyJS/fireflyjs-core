import { Errors as BaseErrors } from "../../Base";
import { Errors, Config } from "..";
import * as check from "./allChecks";

const checkRunner = (
  x: any,
  config: Config,
  key: string
): { value: Date; errors: BaseErrors<Errors>[] } => {
  const {
    greaterThan,
    greaterThanOrEqualTo,
    lessThan,
    lessThanOrEqualTo,
    equalTo,
  } = config;
  const errors: BaseErrors<Errors>[] = [];

  //   type check
  if (!check.type(x)) {
    errors.push({
      error: `${key} must be a Date object`,
      errorType: Errors.Type,
    });
    return { value: x, errors };
  }

  //   value check
  if (greaterThan && !check.greaterThan(x, greaterThan)) {
    errors.push({
      error: `${key} must be greater than ${greaterThan}`,
      errorType: Errors.Value,
    });
  }
  if (
    greaterThanOrEqualTo &&
    !check.greaterThanOrEqual(x, greaterThanOrEqualTo)
  ) {
    errors.push({
      error: `${key} must be greater than or equal to ${greaterThanOrEqualTo}`,
      errorType: Errors.Value,
    });
  }
  if (lessThan && !check.lessThan(x, lessThan)) {
    errors.push({
      error: `${key} must be less than ${lessThan}`,
      errorType: Errors.Value,
    });
  }
  if (lessThanOrEqualTo && !check.lessThanOrEqual(x, lessThanOrEqualTo)) {
    errors.push({
      error: `${key} must be less than or equal to ${lessThanOrEqualTo}`,
      errorType: Errors.Value,
    });
  }
  if (equalTo && !check.equalTo(x, equalTo)) {
    errors.push({
      error: `${key} must be equal to ${equalTo}`,
      errorType: Errors.Value,
    });
  }

  return { value: x, errors };
};

export default checkRunner;
