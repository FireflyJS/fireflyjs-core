import BaseError from "../../types/BaseError";

enum NumberSchemaErrorEnum {
  None = "None",
  Type = "Number/Type",
  Value = "Number/Value",
  Enum = "Number/InvalidValue",
}

type NumberSchemaError = BaseError<NumberSchemaErrorEnum>;

export { NumberSchemaError, NumberSchemaErrorEnum };
