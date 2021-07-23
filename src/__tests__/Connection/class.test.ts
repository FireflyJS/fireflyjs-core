import admin from "firebase-admin";
import Connection from "../../Connection/class";
import * as SchemaType from "../../SchemaTypes";

let firestore: FirebaseFirestore.Firestore;

beforeAll(() => {
  process.env["FIRESTORE_EMULATOR_HOST"] = "localhost:8080";

  admin.initializeApp({
    projectId: "demo-firefly",
  });

  firestore = admin.firestore();
});

describe("Connects to local emulators", () => {
  it("connects to firestore emulator", async () => {
    expect.assertions(1);

    try {
      const connection = new Connection(firestore);
      const model = connection.model(
        "test",
        SchemaType.object<{
          hello: string;
        }>().keys({
          hello: SchemaType.string().required(),
        })
      );

      const doc = await model.create({});

      const data = await doc.data();

      expect(data).toEqual({
        hello: "world",
      });
    } catch (error) {
      const errorType = JSON.parse(error.message).type;
      expect(errorType).toBe("Model/SchemaValidation");
    }
  });
});
