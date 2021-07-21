import { KeyValueStore } from "../types/KeyValue";
import { Pattern } from "../types/ObjectSchema";
import { CheckReturn, Key, Value } from "./type";

const patternCheck = <T extends KeyValueStore>(
  key: Key<T>,
  value: Value<T>,
  pattern: Pattern
): CheckReturn<T> => {
  const [keyPattern, valuePattern] = pattern;

  const { valid: keyValid } = keyPattern.validate(key, key.toString());
  if (keyValid) {
    const valueValidation = valuePattern.validate(value, key.toString());

    return {
      resolved: true,
      ...valueValidation,
    };
  }

  return {
    resolved: false,
    valid: false,
    value: null,
    errors: [],
  };
};

export { patternCheck };
