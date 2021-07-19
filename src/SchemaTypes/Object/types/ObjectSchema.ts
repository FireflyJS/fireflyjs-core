import BaseSchemaConfig from "../../types/BaseSchema";
import SchemaType from "../../class";

type Keys<T = any> = {
  [k in keyof T]: SchemaType;
};

type Pattern = [SchemaType, SchemaType];

interface ObjectSchemaConfig<T> extends BaseSchemaConfig {
  keys?: Keys<T>;
  pattern?: Pattern;
}

export { ObjectSchemaConfig, Keys, Pattern };
