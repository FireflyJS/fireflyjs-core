import { BaseSchemaConfig as Config } from "./types/BaseSchema";
import { ValidateFn } from "./types/ValidateFn";

/**
 * Base SchemaType Class to define the structure of other SchemaType Classes
 */
abstract class SchemaType<T = any> {
  protected __config: Config<T> = {};

  /**
   * marks the value as a required value.
   * @returns {this} same instance of class with property set as required.
   */
  public required = (): this => {
    this.__config.required = true;
    return this;
  };

  /**
   * sets a default value for given property.
   * @param {T} x value to be set as default
   * @returns {this} same instance of class with property having a default value.
   */
  public default = (x: T): this => {
    this.__config.default = x;
    return this;
  };

  public get __required(): boolean {
    return Boolean(this.__config.required);
  }

  public get __default(): T | undefined {
    return this.__config.default;
  }

  abstract validate: ValidateFn<T>;
}

export default SchemaType;
