import BaseSchema, { Config } from "../../Base";
import StringSchema from "../../String";

// TODO:- convert basic type to custom type
type Keys<T = any> = {
  [k in keyof T]: BaseSchema;
};

type Pattern = [StringSchema, BaseSchema];

interface ObjectSchemaConfig<T> extends Config<T> {
  keys?: Keys<T>;
  pattern?: Pattern;
}

export { ObjectSchemaConfig, Keys, Pattern };
