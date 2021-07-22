import BaseError from "../../types/BaseError";

enum DateSchemaErrorEnum {
  None = "None",
  Type = "Date/Type",
  Value = "Date/InvalidValue",
}

type DateSchemaError = BaseError<DateSchemaErrorEnum>;

export { DateSchemaError, DateSchemaErrorEnum };
