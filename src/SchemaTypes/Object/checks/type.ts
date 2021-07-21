import BaseError from "src/SchemaTypes/types/BaseError";
import { KeyValueStore } from "../types/KeyValue";

type CheckReturn = {
  resolved: boolean;
  valid: boolean;
  value: KeyValueStore[string];
  errors: BaseError[];
};

export { CheckReturn };
