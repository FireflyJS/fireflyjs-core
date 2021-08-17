import * as FireflyNamespace from "./Firefly";
import * as ConnectionNamespace from "./Connection";
import * as ModelNamespace from "./Model";
import * as DocumentNamespace from "./Document";

const Firefly = FireflyNamespace.default;

export default new Firefly();
export { Firefly };
export const FireflyErrors = FireflyNamespace.Errors;

export const Connection = ConnectionNamespace.default;
export type ModelPOJO = ConnectionNamespace.ModelPOJO;

export * from "./SchemaTypes";

export const Model = ModelNamespace.default;
export const ModelErrors = ModelNamespace.Errors;

export const Document = DocumentNamespace.default;
export const DocumentErrors = DocumentNamespace.Errors;
export type UpdateOptions = DocumentNamespace.UpdateOptions;
