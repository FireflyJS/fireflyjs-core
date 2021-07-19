import SchemaType from "../class";
import { ObjectSchemaConfig, Keys, Pattern } from "./types/ObjectSchema";
import { ObjectSchemaError } from "./types/ObjectError";

class ObjectSchema extends SchemaType<Keys> {
  protected override __config: ObjectSchemaConfig = {};

  public keys = (x: Keys): this => {
    this.__config.keys = x;
    return this;
  };

  public pattern = (x: Pattern): this => {
    this.__config.pattern = x;
    return this;
  };

  public validate = (
    _x: any,
    // eslint-disable-next-line
    _key: string = "value"
  ): {
    value: any;
    valid: boolean;
    errors: ObjectSchemaError[];
  } => {
    const errors: ObjectSchemaError[] = [];

    return {
      value: {},
      valid: false,
      errors,
    };
  };
}

export default ObjectSchema;
