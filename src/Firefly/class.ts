import { firestore as __firestore } from "firebase-admin";
import Connection from "../Connection";
import { FireflyErrors } from ".";
import makeError from "../utils/makeError";

class Firefly {
  private __dbMap: Map<string, Connection> = new Map<string, Connection>();

  public createConnection(
    firestore: __firestore.Firestore,
    dbName: string = "default"
  ): Connection {
    const connection: Connection = new Connection(firestore);
    this.__dbMap.set(dbName, connection);
    return connection;
  }

  public getConnection(dbName: string): Connection {
    const connection: Connection | undefined = this.__dbMap.get(dbName);

    if (typeof connection === "undefined") {
      throw makeError(
        FireflyErrors.invalid,
        `Firefly Connection with key ${dbName} does not exist`
      );
    }

    return connection;
  }
}

export default Firefly;
