import * as BaseSchema from "./Base";
import * as StringSchema from "./String";
import * as NumberSchema from "./Number";
import * as BooleanSchema from "./Boolean";
import * as DateSchema from "./Date";
import * as ObjectSchema from "./Object";

export const string = () => new StringSchema.Class();
export const number = () => new NumberSchema.Class();
export const boolean = () => new BooleanSchema.Class();
export const date = () => new DateSchema.Class();
export const object = <T extends ObjectSchema.KeyValueStore = any>() =>
  new ObjectSchema.Class<T>();
export type KeyValueStore = ObjectSchema.KeyValueStore;
export {
  BaseSchema,
  StringSchema,
  NumberSchema,
  BooleanSchema,
  DateSchema,
  ObjectSchema,
};
