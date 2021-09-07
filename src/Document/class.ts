import { firestore as __firestore } from "firebase-admin";
import { ObjectSchema, KeyValueStore } from "../SchemaTypes";
import { Errors, UpdateOptions } from ".";
import makeError from "../utils/makeError";

/**
 * Class for Firefly document
 */
class Document<T extends KeyValueStore = any> {
  private __docRef: __firestore.DocumentReference<T>;

  private __schema: ObjectSchema<T>;

  /**
   * Initialize a new Document instance.
   * @constructor
   * @param {__firestore.DocumentReference<T>} docRef - The Firestore document reference.
   * @param {ObjectSchema<T>} schema - The schema for the document.
   */
  constructor(
    docRef: __firestore.DocumentReference<T>,
    schema: ObjectSchema<T>
  ) {
    this.__docRef = docRef;
    this.__schema = schema;
  }

  /**
   * returns the document schema
   * @returns {ObjectSchema<T>} Document Schema
   */
  get schema(): ObjectSchema<T> {
    return this.__schema;
  }

  /**
   * returns the document id
   * @returns {string} Document id
   */
  get id(): string {
    return this.__docRef.id;
  }

  /**
   * Fetches the document data from Firestore.
   * @returns {Promise<T>} Promise that resolves with the document data.
   */
  public data = async (): Promise<T> => {
    const docSnap = await this.__docRef.get().catch((err: Error) => {
      throw makeError(Errors.Firestore, err.message);
    });

    const docData = docSnap.data();
    if (typeof docData === "undefined" || !docSnap.exists)
      throw makeError(Errors.Invalid, "Document is empty or non existant");

    return docData;
  };

  /**
   * Updates the document value in Firestore with the supplied data.
   * @param {Partial<T>} data - The new data to update the document with.
   * @param {UpdateOptions} [options = {merge: true}] - The update options to be used while updating the document in Firestore. See reference @link https://googleapis.dev/nodejs/firestore/latest/global.html#SetOptions
   */
  public update = async (
    data: Partial<T>,
    options: UpdateOptions = { merge: true }
  ) => {
    const { valid, value, errors } = this.__schema.validate(data, undefined, {
      onlySupplied: true,
    });
    if (!valid) {
      throw makeError(Errors.Validation, errors);
    }

    await this.__docRef.set(value, options);
  };

  /**
   * Deletes the document from Firestore.
   */
  public delete = async () => {
    await this.__docRef.delete();
  };
}

export default Document;
