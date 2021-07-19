import StringSchemaType from "./String/class";
import NumberSchemaType from "./Number/class";
import ObjectSchemaType from "./Object/class";
import { KeyValueStore } from "./Object/types/KeyValue";

const string = () => new StringSchemaType();
const number = () => new NumberSchemaType();
const object = <T extends KeyValueStore = any>() => new ObjectSchemaType<T>();

export { string, number, object };
