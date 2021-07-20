import BaseError from "../../types/BaseError";

enum BooleanSchemaErrorEnum {
  None = "None",
  Type = "Boolean/Type",
}

type BooleanSchemaError = BaseError<BooleanSchemaErrorEnum>;

export { BooleanSchemaError, BooleanSchemaErrorEnum };
