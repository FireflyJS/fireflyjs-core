import BaseSchemaConfig from "../../types/BaseSchema";

interface BooleanSchemaConfig extends BaseSchemaConfig<boolean> {
  strict?: true;
}

export { BooleanSchemaConfig };
