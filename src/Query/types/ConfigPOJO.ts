import { KeyValueStore } from "../../SchemaTypes/Object/types/KeyValue";

type ConfigValues = string | number | boolean | null | Date;

type Operators = {
  $gt: ConfigValues;
  $gte: ConfigValues;
  $lt: ConfigValues;
  $lte: ConfigValues;
  $eq: ConfigValues;
  $neq: ConfigValues;
  $ctn: ConfigValues | ConfigValues[];
  $in: ConfigValues[];
  $nin: ConfigValues[];
};

type ConfigPOJO<T extends KeyValueStore> = {
  [k in keyof T]?: Partial<T[k]> | Operators;
};

type ExtConfigPOJO = {
  limit?: number;
  offset?: number;
  startAt?: number;
  orderBy?: string[];
  select?: string[];
};

export { ConfigPOJO, ExtConfigPOJO, Operators };
