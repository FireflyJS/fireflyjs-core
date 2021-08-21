import { Errors as BaseErrors } from "../../Base";
import { KeyValueStore } from "../types/KeyValue";

type CheckReturn = {
  resolved: boolean;
  valid: boolean;
  value: KeyValueStore[string];
  errors: BaseErrors[];
};

export { CheckReturn };
