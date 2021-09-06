import { firestore as __firestore } from "firebase-admin";
import { Operators } from "../Base";

const convertDate = (value: Operators[keyof Operators]) => {
  if (Array.isArray(value)) {
    return value.map((val) =>
      val instanceof Date ? __firestore.Timestamp.fromDate(val) : val
    );
  }

  return value instanceof Date ? __firestore.Timestamp.fromDate(value) : value;
};

export default convertDate;
