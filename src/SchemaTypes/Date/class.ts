import BaseSchema, { Errors as BaseErrors } from "../Base";
import { Errors, Config } from ".";
import checkRunner from "./checks";

class DateSchema extends BaseSchema<Date> {
  protected override __config: Config = {};

  public greaterThan = (x: Date): this => {
    this.__config.greaterThan = x;
    return this;
  };

  public greaterThanOrEqualTo = (x: Date): this => {
    this.__config.greaterThanOrEqualTo = x;
    return this;
  };

  public lessThan = (x: Date): this => {
    this.__config.lessThan = x;
    return this;
  };

  public lessThanOrEqualTo = (x: Date): this => {
    this.__config.lessThanOrEqualTo = x;
    return this;
  };

  public equalTo = (x: Date): this => {
    this.__config.equalTo = x;
    return this;
  };

  validate = (
    x: any,
    key: string = "value"
  ): {
    value: Date;
    valid: boolean;
    errors: BaseErrors<Errors>[];
  } => {
    const { value, errors } = checkRunner(x, this.__config, key);

    return {
      valid: Boolean(errors.length === 0),
      value,
      errors,
    };
  };
}

export default DateSchema;
