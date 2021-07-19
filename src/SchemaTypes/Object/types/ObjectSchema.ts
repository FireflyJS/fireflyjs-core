import BaseSchemaConfig from "../../types/BaseSchema";
import SchemaType from "../../class";

type Keys = {
  [k: string]: SchemaType;
};

type Pattern = [SchemaType, SchemaType];

interface ObjectSchemaConfig extends BaseSchemaConfig {
  keys?: Keys;
  pattern?: Pattern;
}

export { ObjectSchemaConfig, Keys, Pattern };
