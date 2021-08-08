import admin from "firebase-admin";
import Firefly from "../../Firefly/class";
import Model from "../../Model/class";
import * as SchemaType from "../../SchemaTypes";

let firestore: FirebaseFirestore.Firestore;

let firefly = new Firefly();

let user: Model<{
  userName: string;
  isAdmin: boolean;
  sNO: number;
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
    isAdmin: boolean;
    sNO: number;
  }>().keys({
    userName: SchemaType.string().required(),
    isAdmin: SchemaType.boolean().default(false),
    sNO: SchemaType.number().required(),
  });

  user = fireflyConn.model("User", userSchema);

  const [userDocument] = await Promise.all([
    user.create({
      userName: "lorem",
      isAdmin: true,
      sNO: 1,
    }),
    user.create({
      userName: "ipsum",
      isAdmin: false,
      sNO: 2,
    }),
    user.create({
      userName: "dolor",
      sNO: 3,
    }),
    user.create({
      userName: "sit",
      isAdmin: true,
      sNO: 4,
    }),
    user.create({
      userName: "amet",
      isAdmin: true,
      sNO: 5,
    }),
    user.create({
      userName: "consectetur",
      isAdmin: false,
      sNO: 6,
    }),
  ]);

  userId = userDocument.id;
}, 10 * 60 * 1000);

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
      isAdmin: true,
      sNO: 1,
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
      isAdmin: true,
      sNO: 1,
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
      isAdmin: true,
      sNO: 1,
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

  it("limit returns only the specific no of documents", async () => {
    const query = await user
      .find({
        isAdmin: true,
      })
      .limit(1)
      .exec();

    if (!query) {
      throw new Error("Document returned from query is empty");
    }

    expect(query).toBeDefined();
    expect(query.length).toBe(1);

    const doc = query[0];

    if (!doc) {
      throw new Error("Document returned from query is empty");
    }

    expect(doc).toBeDefined();

    const docData = await doc.data();

    expect(docData.isAdmin).toBe(true);
  });

  it("orderBy +string arranges in ascending order", async () => {
    const query = await user
      .find({
        isAdmin: true,
      })
      .orderBy("+sNO")
      .exec();

    if (!query) {
      throw new Error("Document returned from query is empty");
    }

    expect(query).toBeDefined();

    const doc = query[0];

    if (!doc) {
      throw new Error("Document returned from query is empty");
    }

    expect(doc).toBeDefined();

    const docData = await doc.data();

    expect(docData.sNO).toBe(1);

    const lastDoc = query[query.length - 1];

    if (!lastDoc) {
      throw new Error("Document returned from query is empty");
    }

    const lastDocData = await lastDoc.data();

    expect(lastDocData.sNO).toBe(5);
  });

  it("orderBy -string arranges in descending order", async () => {
    const query = await user
      .find({
        isAdmin: true,
      })
      .orderBy("-sNO")
      .exec();

    if (!query) {
      throw new Error("Document returned from query is empty");
    }

    expect(query).toBeDefined();

    const doc = query[0];

    if (!doc) {
      throw new Error("Document returned from query is empty");
    }

    expect(doc).toBeDefined();

    const docData = await doc.data();

    expect(docData.sNO).toBe(5);

    const lastDoc = query[query.length - 1];

    if (!lastDoc) {
      throw new Error("Document returned from query is empty");
    }

    const lastDocData = await lastDoc.data();

    expect(lastDocData.sNO).toBe(1);
  });

  // ! Needs to be fixed
  it("select returns only the selected fields", async () => {
    const query = await user
      .find({
        userName: "lorem",
      })
      .select("userName")
      .exec();

    if (!query) {
      throw new Error("Document returned from query is empty");
    }

    expect(query).toBeDefined();

    const doc = query[0];

    if (!doc) {
      throw new Error("Document returned from query is empty");
    }

    expect(doc).toBeDefined();

    const docData = await doc.data();

    expect(docData).toEqual({
      userName: "lorem",
      sNO: 1,
      isAdmin: true,
    });
  });
});
