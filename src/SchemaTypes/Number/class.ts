import * as BaseSchema from "../Base";
import { Errors, Config } from ".";
import checkRunner from "./checks";

class NumberSchema extends BaseSchema.Class<number> {
  protected override __config: Config = {};

  public integer = (): this => {
    this.__config.integer = true;
    return this;
  };

  public min = (x: number): this => {
    this.__config.min = x;
    return this;
  };

  public max = (x: number): this => {
    this.__config.max = x;
    return this;
  };

  public enum = (x: number[]): this => {
    this.__config.enum = x;
    return this;
  };

  validate = (
    x: any,
    key: string = "value"
  ): {
    value: number;
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

export default NumberSchema;
