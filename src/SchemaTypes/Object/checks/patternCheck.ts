import { KeyValueStore } from "../types/KeyValue";
import { Pattern } from "../types/ObjectSchema";
import { CheckReturn } from "./type";

const patternCheck = (
  key: string,
  value: KeyValueStore[string],
  pattern: Pattern
): CheckReturn => {
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
