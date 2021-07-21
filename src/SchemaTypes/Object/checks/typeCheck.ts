import { KeyValueStore } from "../types/KeyValue";

const typeCheck = (x: any): x is KeyValueStore => {
  if (x !== null && typeof x === "object" && !Array.isArray(x)) return true;

  return false;
};

export { typeCheck };
