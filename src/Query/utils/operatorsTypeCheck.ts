/* eslint-disable no-restricted-syntax */
import { Operators } from "../types/ConfigPOJO";

const operatorsTypeCheck = (value: object): value is Operators => {
  for (const key in value) {
    if (key.trim().charAt(0) !== "$") {
      return false;
    }
  }

  return true;
};

export default operatorsTypeCheck;
