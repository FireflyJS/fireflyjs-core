import BaseError from "./types/BaseError";

abstract class SchemaType {
  public abstract validate: (
    x: any,
    key: string
  ) => {
    valid: boolean;
    errors: BaseError[];
  };
}

export default SchemaType;
