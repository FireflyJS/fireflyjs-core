import StringSchemaType from "./String/class";
import NumberSchemaType from "./Number/class";
import BooleanSchemaType from "./Boolean/class";
import DateSchemaType from "./Date/class";
import ObjectSchemaType from "./Object/class";
import { KeyValueStore } from "./Object/types/KeyValue";

const string = () => new StringSchemaType();
const number = () => new NumberSchemaType();
const boolean = () => new BooleanSchemaType();
const date = () => new DateSchemaType();
const object = <T extends KeyValueStore = any>() => new ObjectSchemaType<T>();

export { string, number, boolean, date, object };
