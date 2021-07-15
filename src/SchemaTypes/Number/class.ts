import SchemaType from "../class";
import { NumberSchemaConfig } from "./types/NumberSchema";
import {
  NumberSchemaError,
  NumberSchemaErrorEnum as msg,
} from "./types/NumberError";

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
    const errors = [
      {
        error: `${key}${x}`,
        errorType: msg.Type,
      },
    ];
    return {
      valid: true,
      errors,
    };
  };
}

export default NumberSchema;
