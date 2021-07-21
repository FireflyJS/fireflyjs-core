import BaseSchemaConfig from "../../types/BaseSchema";
import SchemaType from "../../class";

// TODO:- convert basic type to custom type
type Keys<T = any> = {
  [k in keyof T]: SchemaType;
};

type Pattern = [SchemaType, SchemaType]

interface ObjectSchemaConfig<T> extends BaseSchemaConfig<T> {
  keys?: Keys<T>;
  pattern?: Pattern;
}

export { ObjectSchemaConfig, Keys, Pattern };
