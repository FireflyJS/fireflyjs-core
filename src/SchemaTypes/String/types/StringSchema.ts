type StringSchemaConfig = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  lowercase?: boolean;
  uppercase?: boolean;
  regex?: RegExp | "email";
};

export { StringSchemaConfig };
