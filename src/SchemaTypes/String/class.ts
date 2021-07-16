import SchemaType from "../class";
import { StringSchemaConfig } from "./types/StringSchema";
import checkRunner from "./checks/checksRunner";
import { StringSchemaError } from "./types/StringError";

class StringSchema extends SchemaType {
  protected override __config: StringSchemaConfig = {};

  public trim = (): this => {
    this.__config.trim = true;
    return this;
  };

  public minLength = (x: number): this => {
    this.__config.minLength = x;
    return this;
  };

  public maxLength = (x: number): this => {
    this.__config.maxLength = x;
    return this;
  };

  public lowercase = (): this => {
    this.__config.lowercase = true;
    return this;
  };

  public uppercase = (): this => {
    this.__config.uppercase = true;
    return this;
  };

  public email = (): this => {
    this.__config.regex = "email";
    return this;
  };

  public regex = (x: RegExp): this => {
    this.__config.regex = x;
    return this;
  };

  public enum = (x: string[]): this => {
    if (x.length > 0) {
      this.__config.enum = x;
    }
    return this;
  };

  validate = (
    x: any,
    key: string = "value"
  ): { valid: boolean; errors: StringSchemaError[] } => {
    const errors = checkRunner(x, this.__config, key);

    return {
      valid: Boolean(errors.length === 0),
      errors,
    };
  };
}

export default StringSchema;
