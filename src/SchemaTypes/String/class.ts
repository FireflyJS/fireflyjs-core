import BaseSchema, { Errors as BaseErrors } from "../Base";
import { Config, Errors } from ".";
import checkRunner from "./checks";

class StringSchema extends BaseSchema<string> {
  protected override __config: Config = {};

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
  ): { value: string; valid: boolean; errors: BaseErrors<Errors>[] } => {
    const { value, errors } = checkRunner(x, this.__config, key);

    return {
      valid: Boolean(errors.length === 0),
      value,
      errors,
    };
  };
}

export default StringSchema;
