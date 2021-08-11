import { firestore } from "firebase-admin";
import BaseError from "./BaseError";

type Options = {
  onlySupplied: boolean;
  onlyKeys: boolean;
};

type ValidateFn<T> = (
  x: any,
  key: string,
  options?: Options
) => {
  value: T | Partial<T> | firestore.Timestamp;
  valid: boolean;
  errors: BaseError[];
};

export { ValidateFn, Options };
