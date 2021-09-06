import * as BaseQueryNs from "./Base";
import * as SingleQueryNs from "./SingleQuery";
import * as MultipleQueryNs from "./MultipleQuery";
import * as DeleteQueryNs from "./DeleteQuery";
import * as UpdateQueryNs from "./UpdateQuery";

export const BaseQuery = BaseQueryNs.Class;
export const SingleQuery = SingleQueryNs.Class;
export const MultipleQuery = MultipleQueryNs.Class;
export const DeleteQuery = DeleteQueryNs.Class;
export const UpdateQuery = UpdateQueryNs.Class;

export {
  BaseQueryNs,
  SingleQueryNs,
  MultipleQueryNs,
  DeleteQueryNs,
  UpdateQueryNs,
};
