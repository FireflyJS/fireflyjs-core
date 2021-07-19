import BaseError from "./types/BaseError";
import BaseSchemaConfig from "./types/BaseSchema";

type ValidateFn<T> = (
  x: any,
  key: string
) => {
  value: T | Partial<T>;
  valid: boolean;
  errors: BaseError[];
};

abstract class SchemaType<T = any> {
  protected __config: BaseSchemaConfig<T> = {};

  public required = (): this => {
    this.__config.required = true;
    return this;
  };

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
