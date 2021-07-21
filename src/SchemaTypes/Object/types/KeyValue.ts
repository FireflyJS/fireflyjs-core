type ValidValueTypes =
  | string
  | number
  | boolean
  | Date
  | null
  | KeyValueStore
  | ValidValueTypes[];

type KeyValueStore<T extends KeyValueStore = any> = {
  [k in keyof T]: ValidValueTypes;
};

export { KeyValueStore };
