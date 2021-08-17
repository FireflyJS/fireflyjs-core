import SchemaType from "../class";
import BaseError from "../types/BaseError";
import { KeyValueStore, Config, Keys, Pattern } from ".";
import { Options } from "../types/ValidateFn";
import checksRunner from "./checks";

class ObjectSchema<T extends KeyValueStore = any> extends SchemaType<T> {
  protected override __config: Config<T> = {};

  get __keys() {
    const configKeys = this.__config.keys;
    if (configKeys) return Object.keys(configKeys);
    return [];
  }

  public keys = (x: Keys<T>): this => {
    this.__config.keys = x;
    return this;
  };

  public pattern = (x: Pattern): this => {
    if (x.length === 2) {
      this.__config.pattern = x;
    }
    return this;
  };

  validate = (
    x: any,
    key: string = "value",
    options: Options = {
      onlySupplied: false,
      onlyKeys: false,
    }
  ): {
    value: Partial<T>;
    valid: boolean;
    errors: BaseError[];
  } => {
    const { value, errors } = checksRunner<T>(x, this.__config, key, options);

    return {
      value,
      valid: Boolean(errors.length === 0),
      errors,
    };
  };
}

export default ObjectSchema;
