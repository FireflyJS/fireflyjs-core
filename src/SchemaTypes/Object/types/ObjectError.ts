import BaseError from "../../types/BaseError";

enum ObjectSchemaErrorEnum {
  None = "None",
  Type = "Object/Type",
  Keys = "Object/InvalidKeys",
  Pattern = "Object/InvalidPattern",
}

type ObjectSchemaError = BaseError<ObjectSchemaErrorEnum>;

export { ObjectSchemaError, ObjectSchemaErrorEnum };
