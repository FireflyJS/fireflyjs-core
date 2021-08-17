import { Config as BaseConfig } from "../../Base";

interface NumberSchemaConfig extends BaseConfig {
  integer?: true;
  min?: number;
  max?: number;
  enum?: number[];
}

export { NumberSchemaConfig };
