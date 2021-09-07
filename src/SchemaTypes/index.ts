import * as BaseSchemaNs from "./Base";
import * as StringSchemaNs from "./String";
import * as NumberSchemaNs from "./Number";
import * as BooleanSchemaNs from "./Boolean";
import * as DateSchemaNs from "./Date";
import * as ObjectSchemaNs from "./Object";

export type KeyValueStore = ObjectSchemaNs.KeyValueStore;

export class StringSchema extends StringSchemaNs.default {}
export class NumberSchema extends NumberSchemaNs.default {}
export class BooleanSchema extends BooleanSchemaNs.default {}
export class DateSchema extends DateSchemaNs.default {}
export class ObjectSchema<
  T extends KeyValueStore = any
> extends ObjectSchemaNs.default<T> {}

export const string = () => new StringSchema();
export const number = () => new NumberSchema();
export const boolean = () => new BooleanSchema();
export const date = () => new DateSchema();
export const object = <T extends KeyValueStore = any>() =>
  new ObjectSchema<T>();

export {
  BaseSchemaNs,
  StringSchemaNs,
  NumberSchemaNs,
  BooleanSchemaNs,
  DateSchemaNs,
  ObjectSchemaNs,
};
