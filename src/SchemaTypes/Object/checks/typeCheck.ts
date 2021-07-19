import { KeyValueStore } from "../types/KeyValue";

const typeCheck = <T extends KeyValueStore>(x: any): x is KeyValueStore<T> => {
  if (x !== null && typeof x === "object" && !Array.isArray(x)) return true;

  return false;
};

export { typeCheck };
