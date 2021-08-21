import { firestore as __firestore } from "firebase-admin";
import { OperatorValues } from "../types/ConfigPOJO";

const convertDate = (value: OperatorValues | OperatorValues[]) => {
  if (Array.isArray(value)) {
    return value.map((val) =>
      val instanceof Date ? __firestore.Timestamp.fromDate(val) : val
    );
  }

  return value instanceof Date ? __firestore.Timestamp.fromDate(value) : value;
};

export default convertDate;
