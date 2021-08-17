import * as BaseSchema from "../../Base";
import * as StringSchema from "../../String";

// TODO:- convert basic type to custom type
type Keys<T = any> = {
  [k in keyof T]: BaseSchema.Class;
};

type Pattern = [StringSchema.Class, BaseSchema.Class];

interface ObjectSchemaConfig<T> extends BaseSchema.Config<T> {
  keys?: Keys<T>;
  pattern?: Pattern;
}

export { ObjectSchemaConfig, Keys, Pattern };
