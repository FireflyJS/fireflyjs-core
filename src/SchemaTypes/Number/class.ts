import SchemaType from "../class";
import { NumberSchemaConfig } from "./types/NumberSchema";
import { NumberSchemaError } from "./types/NumberError";
import checkRunner from "./checks/checksRunner";

class NumberSchema extends SchemaType {
  private __config: NumberSchemaConfig = {};

  public integer = () => {
    this.__config.integer = true;
  };

  public min = (x: number) => {
    this.__config.min = x;
  };

  public max = (x: number) => {
    this.__config.max = x;
  };

  public enum = (x: number[]) => {
    this.__config.enum = x;
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
