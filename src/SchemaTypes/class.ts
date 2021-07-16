import BaseError from "./types/BaseError";
import BaseSchemaConfig from "./types/BaseSchema";

abstract class SchemaType {
  protected __config: BaseSchemaConfig = {};

  public abstract validate: (
    x: any,
    key: string
  ) => {
    valid: boolean;
    errors: BaseError[];
  };
}

export default SchemaType;
