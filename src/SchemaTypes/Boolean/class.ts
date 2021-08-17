import * as BaseSchema from "../Base";
import { Config, Errors } from ".";
import checkRunner from "./checks";

class BooleanSchema extends BaseSchema.Class<boolean> {
  protected override __config: Config = {};

  public strict(): this {
    this.__config.strict = true;
    return this;
  }

  validate = (
    x: any,
    key: string = "value"
  ): {
    value: boolean;
    valid: boolean;
    errors: BaseSchema.Errors<Errors>[];
  } => {
    const { value, errors } = checkRunner(x, this.__config, key);

    return {
      valid: Boolean(errors.length === 0),
      value,
      errors,
    };
  };
}

export default BooleanSchema;
