import BaseSchemaConfig from "../../types/BaseSchema";

type ValidValues = string | number | boolean | Date | Keys | ValidValues[];

type Keys = {
  [k: string]: ValidValues;
  [k: number]: ValidValues;
};

type Pattern = [BaseSchemaConfig, BaseSchemaConfig];

interface ObjectSchemaConfig extends BaseSchemaConfig {
  keys?: Keys;
  pattern?: Pattern;
}

export { ObjectSchemaConfig, Keys, Pattern };
