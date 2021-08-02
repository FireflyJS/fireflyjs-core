import admin from "firebase-admin";
import Connection from "../../Connection/class";
import Firefly from "../../Firefly/class";

let firestore: FirebaseFirestore.Firestore;

beforeAll(() => {
  process.env["FIRESTORE_EMULATOR_HOST"] = "localhost:8080";

  admin.initializeApp({
    projectId: "demo-firefly",
  });

  firestore = admin.firestore();
});

describe("Test Firefly main class", () => {
  it("should create a Connection instance", () => {
    const firefly = new Firefly();
    const fireflyConn = firefly.createConnection(firestore);
    expect(fireflyConn).toBeDefined();
    expect(fireflyConn instanceof Connection).toBe(true);
  });

  it("should create a Connection instance with custom names", () => {
    const firefly = new Firefly();
    const fireflyConn = firefly.createConnection(firestore, "my-db");
    expect(fireflyConn).toBeDefined();
    expect(fireflyConn instanceof Connection).toBe(true);
    const dbConn = firefly.getConnection("my-db");
    expect(dbConn).toBeDefined();
    expect(dbConn instanceof Connection).toBe(true);
  });

  it("should throw an error, if passed a non-existent connection key", () => {
    try {
      const firefly = new Firefly();
      const fireflyConn = firefly.createConnection(firestore);
      expect(fireflyConn).toBeDefined();
      const dbConn = firefly.getConnection("bad-key");
      expect(dbConn).toBeUndefined();
    } catch (err) {
      expect(err.message).toBe(
        '{"type":"Firefly/Invalid","data":"Firefly Connection with key bad-key does not exist"}'
      );
    }
  });
});
