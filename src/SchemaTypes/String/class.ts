import SchemaType from "../class";
import { StringSchemaConfig } from "./types/StringSchema";
import checkRunner from "./checks/checksRunner";
import { StringSchemaError } from "./types/StringError";

class StringSchema extends SchemaType {
  private __config: StringSchemaConfig = {};

  public required = () => {
    this.__config.required = true;
  };

  public minLength = (x: number) => {
    this.__config.minLength = x;
  };

  public maxLength = (x: number) => {
    this.__config.maxLength = x;
  };

  public lowercase = () => {
    this.__config.lowercase = true;
  };

  public uppercase = () => {
    this.__config.uppercase = true;
  };

  public email = () => {
    this.__config.regex = "email";
  };

  public regex = (x: RegExp) => {
    this.__config.regex = x;
  };

  get __isRequired() {
    return this.__config.required;
  }

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
