import BaseSchemaConfig from "../../types/BaseSchema";

interface StringSchemaConfig extends BaseSchemaConfig<string> {
  trim?: true;
  minLength?: number;
  maxLength?: number;
  lowercase?: true;
  uppercase?: true;
  regex?: RegExp | "email";
  enum?: string[];
}

export { StringSchemaConfig };
