import { Errors as BaseErrors } from "../../Base";
import { Errors, Config } from "..";
import * as check from "./allChecks";

const checkRunner = (
  x: any,
  config: Config,
  key: string
): {
  value: boolean;
  errors: BaseErrors<Errors>[];
} => {
  const { strict } = config;
  const errors: BaseErrors<Errors>[] = [];

  let val = x;
  if (!strict) val = Boolean(val);

  // type check
  if (!check.type(val)) {
    errors.push({
      error: `${key} must be a boolean`,
      errorType: Errors.Type,
    });
    return { value: val, errors };
  }

  return { value: val, errors };
};

export default checkRunner;
