import { firestore as __firestore } from "firebase-admin";
import Connection from "../Connection/class";

class Firefly {
  private __dbMap!: Map<string, Connection>;

  public createConnection(
    dbName: string = "default",
    firestore: __firestore.Firestore
  ): Connection {
    const connection: Connection = new Connection(firestore);
    this.__dbMap.set(dbName, connection);
    return connection;
  }

  public getConnection(dbName: string): Connection {
    const connection: Connection | undefined = this.__dbMap.get(dbName);

    if (typeof connection === "undefined") {
      throw new Error(`Firefly Connection ${dbName} does not exist`);
    }

    return connection;
  }
}

export default Firefly;
