import BaseSchemaConfig from "../../types/BaseSchema";

interface NumberSchemaConfig extends BaseSchemaConfig {
  integer?: true;
  min?: number;
  max?: number;
  enum?: number[];
}

export { NumberSchemaConfig };
