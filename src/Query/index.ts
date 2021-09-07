import * as BaseQueryNs from "./Base";
import * as SingleQueryNs from "./SingleQuery";
import * as MultipleQueryNs from "./MultipleQuery";
import * as DeleteQueryNs from "./DeleteQuery";
import * as UpdateQueryNs from "./UpdateQuery";
import { KeyValueStore } from "../SchemaTypes";

export class SingleQuery<
  T extends KeyValueStore
> extends SingleQueryNs.default<T> {}
export class MultipleQuery<
  T extends KeyValueStore
> extends MultipleQueryNs.default<T> {}
export class DeleteQuery<
  T extends KeyValueStore
> extends DeleteQueryNs.default<T> {}
export class UpdateQuery<
  T extends KeyValueStore
> extends UpdateQueryNs.default<T> {}

export {
  BaseQueryNs,
  SingleQueryNs,
  MultipleQueryNs,
  DeleteQueryNs,
  UpdateQueryNs,
};
