import { Config as BaseConfig } from "../../Base";

interface BooleanSchemaConfig extends BaseConfig<boolean> {
  strict?: true;
}

export { BooleanSchemaConfig };
