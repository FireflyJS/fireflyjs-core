import { firestore as __firestore } from "firebase-admin";
import Connection from "../Connection";
import { Errors } from ".";
import makeError from "../utils/makeError";

class Firefly {
  private __dbMap: Map<string, Connection> = new Map<string, Connection>();

  /**
   * Establishes a connection to the Firestore database. Can be used to create multiple set of connections.
   * @param firestore The {@link __firestore | Firestore} instance to use.
   * @param dbName The name of the connection to use.
   * @returns An instance of {@link Connection}.
   */
  public createConnection = (
    firestore: __firestore.Firestore,
    dbName: string = "default"
  ): Connection => {
    const connection: Connection = new Connection(firestore);
    this.__dbMap.set(dbName, connection);
    return connection;
  };

  /**
   * Retrieves an instance of Firefly connection to the Firestore database.
   * @param dbName The name of the connection to retrieve.
   * @returns An instance of {@link Connection}.
   */
  public getConnection = (dbName: string): Connection => {
    const connection: Connection | undefined = this.__dbMap.get(dbName);

    if (typeof connection === "undefined") {
      throw makeError(
        Errors.Invalid,
        `Firefly Connection with key ${dbName} does not exist`
      );
    }

    return connection;
  };
}

export default Firefly;
