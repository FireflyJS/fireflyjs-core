import * as SchemaTypes from "../../../SchemaTypes/index";

describe("Test DateSchema type", () => {
  it("returns an error if passed a value that is not an instance of Date", () => {
    type IObjectSchema = {
      date: Date;
    };

    const objectSchema = SchemaTypes.object<IObjectSchema>().keys({
      date: SchemaTypes.date(),
    });

    const testObj = {
      date: "test",
    };

    const { valid, value, errors } = objectSchema.validate(testObj);

    expect(valid).toBe(false);
    expect(value).toEqual(testObj);
    expect(errors).toEqual([
      {
        error: "date must be a Date object",
        errorType: "Date/Type",
      },
    ]);
  });

  it("returns no error if value passed is an instance of Date and also formats the given value to firestore timestamp", () => {
    type IObjectSchema = {
      date: Date;
    };

    const objectSchema = SchemaTypes.object<IObjectSchema>().keys({
      date: SchemaTypes.date(),
    });

    const testObj = {
      date: new Date("1995-12-17T03:24:00"),
    };

    const { valid, value, errors } = objectSchema.validate(testObj);

    expect(valid).toBe(true);
    expect(value).toEqual({
      date: new Date("1995-12-17T03:24:00"),
    });
    expect(errors).toEqual([]);
  });

  it("returns an error if date is less than the value specified in greaterThan threshold", () => {
    type IObjectSchema = {
      date: Date;
    };

    const objectSchema = SchemaTypes.object<IObjectSchema>().keys({
      date: SchemaTypes.date().greaterThan(new Date("1995-12-17T03:24:00")),
    });

    const testObj = {
      date: new Date("1995-12-11T03:24:00"),
    };

    const { valid, value, errors } = objectSchema.validate(testObj);

    expect(valid).toBe(false);
    expect(value).toEqual(testObj);
    expect(errors).toEqual([
      {
        error:
          "date must be greater than Sun Dec 17 1995 03:24:00 GMT+0530 (India Standard Time)",
        errorType: "Date/InvalidValue",
      },
    ]);
  });

  it("returns an error if date is greater than the value specified in lessThan threshold", () => {
    type IObjectSchema = {
      date: Date;
    };

    const objectSchema = SchemaTypes.object<IObjectSchema>().keys({
      date: SchemaTypes.date().lessThan(new Date("1995-12-17T03:24:00")),
    });

    const testObj = {
      date: new Date("1995-12-18T03:24:00"),
    };

    const { valid, value, errors } = objectSchema.validate(testObj);

    expect(valid).toBe(false);
    expect(value).toEqual(testObj);
    expect(errors).toEqual([
      {
        error:
          "date must be less than Sun Dec 17 1995 03:24:00 GMT+0530 (India Standard Time)",
        errorType: "Date/InvalidValue",
      },
    ]);
  });

  it("returns no error if date is equal to the threshold value provided in equalTo method", () => {
    type IObjectSchema = {
      date: Date;
    };

    const objectSchema = SchemaTypes.object<IObjectSchema>().keys({
      date: SchemaTypes.date().equalTo(new Date("1995-12-17T03:24:00")),
    });

    const testObj = {
      date: new Date("1995-12-17T03:24:00"),
    };

    const { valid, value, errors } = objectSchema.validate(testObj);

    expect(valid).toBe(true);
    expect(value).toEqual(testObj);
    expect(errors).toEqual([]);
  });

  it("returns no error if the date is equal to or less than the threshold provided in lessThanOrEqualTo method", () => {
    type IObjectSchema = {
      date: Date;
    };

    const objectSchema = SchemaTypes.object<IObjectSchema>().keys({
      date: SchemaTypes.date().lessThanOrEqualTo(
        new Date("1995-12-17T03:24:00")
      ),
    });

    const testObj = {
      date: new Date("1995-12-11T03:24:00"),
    };

    const { valid, value, errors } = objectSchema.validate(testObj);

    expect(valid).toBe(true);
    expect(value).toEqual(testObj);
    expect(errors).toEqual([]);
  });

  it("returns no error if the date is equal to or greater than the threshold provided in greaterThanOrEqualTo method", () => {
    type IObjectSchema = {
      date: Date;
    };

    const objectSchema = SchemaTypes.object<IObjectSchema>().keys({
      date: SchemaTypes.date().greaterThanOrEqualTo(
        new Date("1995-12-17T03:24:00")
      ),
    });

    const testObj = {
      date: new Date("1995-12-18T03:24:00"),
    };

    const { valid, value, errors } = objectSchema.validate(testObj);

    expect(valid).toBe(true);
    expect(value).toEqual(testObj);
    expect(errors).toEqual([]);
  });
});
