import * as SchemaTypes from "../../../SchemaTypes/index";

describe("Test ObjectSchemaType", () => {
  it("returns no error if testObj has defined keys", () => {
    type IObjectSchema = {
      name: string;
      age: number;
    };

    const objectSchema = SchemaTypes.object<IObjectSchema>().keys({
      name: SchemaTypes.string().required(),
      age: SchemaTypes.number().required(),
    });

    const testObj = {
      name: "firefly",
      age: 5,
    };

    const { valid, value, errors } = objectSchema.validate(testObj);

    expect(valid).toBe(true);
    expect(value).toEqual(testObj);
    expect(errors).toEqual([]);
  });

  it("returns error if testObj has missing keys", () => {
    type IObjectSchema = {
      name: string;
      age: number;
    };

    const objectSchema = SchemaTypes.object<IObjectSchema>().keys({
      name: SchemaTypes.string().uppercase().required(),
      age: SchemaTypes.number().required(),
    });

    const testObj = {
      name: "firefly",
    };

    const { valid, value, errors } = objectSchema.validate(testObj);

    expect(valid).toBe(false);
    expect(value).toEqual({
      name: "FIREFLY",
    });
    expect(errors[0]).toBeDefined();
    expect(errors[0]!.errorType).toBe("Object/InvalidKeys");
  });

  it("returns no error if testObj has missing keys that match the specified pattern", () => {
    type IObjectSchema = {
      name: string;
    };

    const objectSchema = SchemaTypes.object<IObjectSchema>()
      .keys({
        name: SchemaTypes.string().required(),
      })
      .pattern([SchemaTypes.string(), SchemaTypes.number()]);

    const testObj = {
      name: "firefly",
      age: 10,
    };

    const { valid, value, errors } = objectSchema.validate(testObj);

    expect(valid).toBe(true);
    expect(value).toEqual(testObj);
    expect(errors).toEqual([]);
  });

  it("returns error if testObj has missing keys that do not match the specified pattern", () => {
    type IObjectSchema = {
      name: string;
    };

    const objectSchema = SchemaTypes.object<IObjectSchema>()
      .keys({
        name: SchemaTypes.string().required(),
      })
      .pattern([SchemaTypes.string().regex(/^age$/), SchemaTypes.number()]);

    const testObj = {
      name: "firefly",
      username: "firefly",
    };

    const { valid, value, errors } = objectSchema.validate(testObj);

    expect(valid).toBe(false);
    expect(value).toEqual({
      name: "firefly",
    });
    expect(errors[0]).toBeDefined();
    expect(errors[0]!.errorType).toBe("Object/InvalidKeys");
  });

  it("returns error if testObj has missing keys whose values do not match the specified pattern", () => {
    type IObjectSchema = {
      name: string;
    };

    const objectSchema = SchemaTypes.object<IObjectSchema>()
      .keys({
        name: SchemaTypes.string().required(),
      })
      .pattern([SchemaTypes.string().regex(/^age$/), SchemaTypes.number()]);

    const testObj = {
      name: "firefly",
      age: "firefly",
    };

    const { valid, value, errors } = objectSchema.validate(testObj);

    expect(valid).toBe(false);
    expect(value).toEqual(testObj);
    expect(errors[0]).toBeDefined();
    expect(errors[0]!.errorType).toBe("Number/Type");
  });

  it("returns error if testObj is missing required keys", () => {
    type IObjectSchema = {
      name: string;
      age: string;
    };

    const objectSchema = SchemaTypes.object<IObjectSchema>().keys({
      name: SchemaTypes.string().required(),
      age: SchemaTypes.number().required(),
    });

    const testObj = {
      age: 10,
    };

    const { valid, value, errors } = objectSchema.validate(testObj);

    expect(valid).toBe(false);
    expect(value).toEqual(testObj);
    expect(errors[0]).toBeDefined();
    expect(errors[0]!.errorType).toBe("Object/InvalidKeys");
  });

  it("returns no error if testObj has missing default keys", () => {
    type IObjectSchema = {
      name: string;
      age: string;
    };

    const objectSchema = SchemaTypes.object<IObjectSchema>().keys({
      name: SchemaTypes.string().default("username"),
      age: SchemaTypes.number().required(),
    });

    const testObj = {
      age: 10,
    };

    const { valid, value, errors } = objectSchema.validate(testObj);

    expect(valid).toBe(true);
    expect(value).toEqual({ ...testObj, name: "username" });
    expect(errors).toEqual([]);
  });

  it("returns no error if testObj is a nested object and default value is provided", () => {
    type IObjectSchema = {
      name: {
        firstName: string;
        lastName: string;
      };
      age: number;
    };

    const objectSchema = SchemaTypes.object<IObjectSchema>().keys({
      name: SchemaTypes.object()
        .keys({
          firstName: SchemaTypes.string().required(),
          lastName: SchemaTypes.string().default("."),
        })
        .default("username"),
      age: SchemaTypes.number().required(),
    });

    const testObj = {
      age: 10,
    };

    const { valid, value, errors } = objectSchema.validate(testObj);

    expect(valid).toBe(true);
    expect(value).toEqual({ ...testObj, name: "username" });
    expect(errors).toEqual([]);
  });

  it("returns no error if testObj is a nested object and keys are missing in the nested object", () => {
    type IObjectSchema = {
      name: {
        firstName: string;
        lastName: string;
      };
      age: number;
    };

    const objectSchema = SchemaTypes.object<IObjectSchema>().keys({
      name: SchemaTypes.object()
        .keys({
          firstName: SchemaTypes.string().required(),
          lastName: SchemaTypes.string().default("."),
        })
        .required(),
      age: SchemaTypes.number().required(),
    });

    const testObj = {
      name: {},
      age: 10,
    };

    const { valid, value, errors } = objectSchema.validate(testObj);

    expect(valid).toBe(false);
    expect(value).toEqual({
      age: 10,
      name: {
        lastName: ".",
      },
    });
    expect(errors[0]).toBeDefined();
    expect(errors[0]!.error).toEqual("firstName is required");
  });
});
