import SchemaType from "../class";
import { NumberSchemaConfig } from "./types/NumberSchema";
import { NumberSchemaError } from "./types/NumberError";
import checkRunner from "./checks/checksRunner";

class NumberSchema extends SchemaType<number> {
  protected override __config: NumberSchemaConfig = {};

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
    valid: boolean;
    errors: NumberSchemaError[];
  } => {
    const errors = checkRunner(x, this.__config, key);

    return {
      valid: Boolean(errors.length === 0),
      errors,
    };
  };
}

export default NumberSchema;
