import { Operators } from "../Base";

const operatorsTypeCheck = (value: object): value is Operators => {
  if (value === null || Array.isArray(value) || value instanceof Date)
    return false;

  // eslint-disable-next-line no-restricted-syntax
  for (const key in value) {
    if (key.trim().charAt(0) !== "$") return false;
  }

  return true;
};

export default operatorsTypeCheck;
