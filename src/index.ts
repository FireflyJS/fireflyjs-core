import * as FireflyNs from "./Firefly";
import * as ConnectionNs from "./Connection";
import * as SchemaTypes from "./SchemaTypes";
import * as ModelNs from "./Model";
import * as QueryNs from "./Query";

class Firefly extends FireflyNs.default {}
const firefly = new Firefly();

class Connection extends ConnectionNs.default {}

class Model<T extends SchemaTypes.KeyValueStore> extends ModelNs.default<T> {}

export default firefly;
export {
  Firefly,
  FireflyNs,
  Connection,
  ConnectionNs,
  SchemaTypes,
  Model,
  ModelNs,
  QueryNs,
};
