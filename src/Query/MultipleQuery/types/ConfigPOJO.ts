import { KeyValueStore } from "../../../SchemaTypes/Object/types/KeyValue";

type OperatorValues = string | number | boolean | null | Date;

type Operators = {
  $gt?: OperatorValues;
  $gte?: OperatorValues;
  $lt?: OperatorValues;
  $lte?: OperatorValues;
  $eq?: OperatorValues;
  $neq?: OperatorValues;
  $ctn?: OperatorValues | OperatorValues[];
  $in?: OperatorValues[];
  $nin?: OperatorValues[];
};

type ConfigPOJO<T extends KeyValueStore> = {
  [k in keyof T]?: Partial<T[k]> | Operators;
};

type ExtendedConfigPOJO = {
  _id: string;
};

type QueryConfigPOJO<T extends KeyValueStore> =
  | ConfigPOJO<T>
  | ExtendedConfigPOJO;

type ExtConfigPOJO = {
  limit?: number;
  offset?: number;
  startAt?: number;
  orderBy?: string[];
  select?: string[];
};

export {
  ConfigPOJO,
  ExtConfigPOJO,
  Operators,
  OperatorValues,
  QueryConfigPOJO,
};
