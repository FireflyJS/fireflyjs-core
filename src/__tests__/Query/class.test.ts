import admin from "firebase-admin";
import Firefly from "../../Firefly/class";
import Model from "../../Model/class";
import * as SchemaType from "../../SchemaTypes";

let firestore: FirebaseFirestore.Firestore;

let firefly = new Firefly();

let user: Model<{
  userName: string;
}>;

let userId: string;

beforeAll(async () => {
  process.env["FIRESTORE_EMULATOR_HOST"] = "localhost:8080";

  admin.initializeApp({
    projectId: "demo-firefly",
  });

  firestore = admin.firestore();

  const fireflyConn = firefly.createConnection(firestore);

  const userSchema = SchemaType.object<{
    userName: string;
  }>().keys({
    userName: SchemaType.string().required(),
  });

  user = fireflyConn.model("User", userSchema);

  const userDocument = await user.create({
    userName: "lorem",
  });

  userId = userDocument.id;
});

describe("Tests for query", () => {
  it("find returns documents", async () => {
    const query = await user
      .find({
        userName: "lorem",
      })
      .exec();

    if (!query) {
      throw new Error("Document returned from query is empty");
    }

    expect(query).toBeDefined();
    expect(query.length).toBeGreaterThan(0);

    const doc = query[0];

    if (!doc) {
      throw new Error("Document returned from query is empty");
    }

    expect(doc).toBeDefined();

    expect(await doc.data()).toEqual({
      userName: "lorem",
    });
  });

  it("findById returns a single document if passed a valid id", async () => {
    const doc = await user.findById(userId).exec();

    if (!doc) {
      throw new Error("Document returned from query is empty");
    }

    expect(doc).toBeDefined();

    expect(await doc.data()).toEqual({
      userName: "lorem",
    });

    expect(doc.id).toEqual(userId);
  });

  it("findById returns null if passed an invalid id", async () => {
    try {
      const doc = await user.findById("invalidId").exec();

      const docData = await doc.data();

      expect(docData).toBeNull();
    } catch (err) {
      const errObj = JSON.parse(err.message);
      expect(errObj.type).toBe("Document/Invalid");
    }
  });

  it("findOne returns a single document if passed a valid condition", async () => {
    const doc = await user
      .findOne({
        userName: "lorem",
      })
      .exec();

    if (!doc) {
      throw new Error("Document returned from query is empty");
    }

    expect(doc).toBeDefined();

    expect(await doc.data()).toEqual({
      userName: "lorem",
    });
  });

  it("findOne returns error if passed invalid condtions", async () => {
    try {
      const doc = await user
        .findOne({
          userName: "invalid",
        })
        .exec();

      const docData = await doc.data();

      expect(docData).toBeNull();
    } catch (err) {
      const errObj = JSON.parse(err.message);
      expect(errObj.type).toBe("SingleQuery/NotFound");
    }
  });
});
