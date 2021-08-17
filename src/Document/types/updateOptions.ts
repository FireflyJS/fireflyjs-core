/**
 * The update options to be used while updating the document in Firestore. See reference
 * @link https://googleapis.dev/nodejs/firestore/latest/global.html#SetOptions
 */
type UpdateOptions = {
  merge: boolean;
  mergeFields?: string[];
};

export { UpdateOptions };
