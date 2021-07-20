import SchemaType from "../class";
import { BooleanSchemaConfig } from "./types/BooleanSchema";
import checkRunner from "./checks/checkRunner";
import { BooleanSchemaError } from "./types/BooleanError";

class BooleanSchema extends SchemaType<boolean> {
  protected override __config: BooleanSchemaConfig = {};

  public strict(): this {
    this.__config.strict = true;
    return this;
  }

  validate = (
    x: any,
    key: string = "value"
  ): { value: boolean; valid: boolean; errors: BooleanSchemaError[] } => {
    const { value, errors } = checkRunner(x, this.__config, key);

    return {
      valid: Boolean(errors.length === 0),
      value,
      errors,
    };
  };
}

export default BooleanSchema;
