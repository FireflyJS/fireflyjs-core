import admin from "firebase-admin";
import Firefly from "../../Firefly/class";
import Model from "../../Model/class";
import * as SchemaTypes from "../../SchemaTypes";

type User = {
  index: number;
  name: string;
  address: {
    houseNo: number;
    city: string;
  };
};

let User: Model<User>;

beforeAll(() => {
  process.env["FIRESTORE_EMULATOR_HOST"] = "localhost:8080";

  admin.initializeApp({
    projectId: "demo-firefly",
  });

  const firestore = admin.firestore();

  const connection = new Firefly().createConnection(firestore);

  const userSchema = SchemaTypes.object<User>().keys({
    index: SchemaTypes.number().required(),
    name: SchemaTypes.string().required(),
    address: SchemaTypes.object()
      .keys({
        houseNo: SchemaTypes.number().required(),
        city: SchemaTypes.string().required(),
      })
      .required(),
  });

  User = connection.model("users", userSchema);
});

describe("Tests for operators in Query", () => {
  it("$gt operator", async () => {
    expect.assertions(2);

    const documents = await User.find({
      index: { $gt: 40 },
    }).exec();

    expect(documents.length).toBe(9);

    const docData = await documents[0]?.data();

    expect(docData!.index).toBe(41);
  });

  it("$gt + $lt operator", async () => {
    expect.assertions(2);

    const documents = await User.find({
      index: { $gt: 40, $lt: 45 },
    }).exec();

    expect(documents.length).toBe(4);

    const docData = await documents[0]?.data();

    expect(docData!.index).toBe(41);
  });

  it("$gte + $lte operator", async () => {
    expect.assertions(2);

    const documents = await User.find({
      index: { $gte: 40, $lte: 45 },
    }).exec();

    expect(documents.length).toBe(6);

    const docData = await documents[0]?.data();

    expect(docData!.index).toBe(40);
  });

  it("$eq operator", async () => {
    expect.assertions(2);

    const documents = await User.find({
      index: { $eq: 1 },
    }).exec();

    expect(documents.length).toBe(1);

    const docData = await documents[0]?.data();

    expect(docData!.index).toBe(1);
  });

  it("$neq operator", async () => {
    expect.assertions(1);

    const documents = await User.find({
      index: { $neq: 0 },
    }).exec();

    expect(documents.length).toBe(50);
  });
});
