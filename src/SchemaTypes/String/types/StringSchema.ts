import * as BaseSchema from "../../Base";

interface StringSchemaConfig extends BaseSchema.Config<string> {
  trim?: true;
  minLength?: number;
  maxLength?: number;
  lowercase?: true;
  uppercase?: true;
  regex?: RegExp | "email";
  enum?: string[];
}

export { StringSchemaConfig };
