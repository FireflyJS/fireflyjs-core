import BaseError from "./types/BaseError";
import BaseSchemaConfig from "./types/BaseSchema";

abstract class SchemaType<T = any> {
  protected __config: BaseSchemaConfig<T> = {};

  public required = () => {
    this.__config.required = true;
  };

  public default = (x: T) => {
    this.__config.default = x;
  };

  protected get __required() {
    return this.__config.required;
  }

  protected get __default() {
    return this.__config.default;
  }

  public abstract validate: (
    x: any,
    key: string
  ) => {
    valid: boolean;
    errors: BaseError[];
  };
}

export default SchemaType;
