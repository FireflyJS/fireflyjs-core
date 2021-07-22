import * as SchemaType from "../../../SchemaTypes/index";

describe("test Boolean Schema Parser", () => {
  it("returns no error if passed a boolean", () => {
    type IObjectSchema = {
      isBoolean: boolean;
    };

    const objectSchema = SchemaType.object<IObjectSchema>().keys({
      isBoolean: SchemaType.boolean(),
    });

    const testObj = {
      isBoolean: true,
    };

    const { valid, value, errors } = objectSchema.validate(testObj);

    expect(valid).toBe(true);
    expect(value).toEqual(testObj);
    expect(errors).toEqual([]);
  });

  it("returns an error if passed a non-boolean value and is in strict mode", () => {
    type IObjectSchema = {
      isBoolean: boolean;
    };

    const objectSchema = SchemaType.object<IObjectSchema>().keys({
      isBoolean: SchemaType.boolean().strict(),
    });

    const testObj = {
      isBoolean: "true",
    };

    const { valid, value, errors } = objectSchema.validate(testObj);

    expect(valid).toBe(false);
    expect(value).toEqual(testObj);
    expect(errors).toEqual([
      {
        error: "isBoolean must be a boolean",
        errorType: "Boolean/Type",
      },
    ]);
  });

  it("converts the value to boolean if passed a non-boolean value and is not in strict mode", () => {
    type IObjectSchema = {
      isBoolean: boolean;
    };

    const objectSchema = SchemaType.object<IObjectSchema>().keys({
      isBoolean: SchemaType.boolean(),
    });

    const testObj = {
      isBoolean: "true",
    };

    const { valid, value, errors } = objectSchema.validate(testObj);

    expect(valid).toBe(true);
    expect(value).toEqual({
      isBoolean: true,
    });
    expect(errors).toEqual([]);
  });
});
