import * as SchemaType from "../../../SchemaTypes/index";

describe("test String Schema Parser", () => {
  it("returns no errors if passed a string", () => {
    type IObjectSchema = {
      name: string;
    };

    const objectSchema = SchemaType.object<IObjectSchema>().keys({
      name: SchemaType.string(),
    });

    const testObj = {
      name: "Lorem",
    };

    const { valid, value, errors } = objectSchema.validate(testObj);

    expect(valid).toBe(true);
    expect(value).toEqual(testObj);
    expect(errors).toEqual([]);
  });

  it("returns error if passed a value other than string", () => {
    type IObjectSchema = {
      name: string;
    };

    const objectSchema = SchemaType.object<IObjectSchema>().keys({
      name: SchemaType.string(),
    });

    const testObj = {
      name: 1,
    };

    const { valid, value, errors } = objectSchema.validate(testObj);

    expect(valid).toBe(false);
    expect(value).toEqual({});
    expect(errors).toEqual([
      {
        error: "name must be a string",
        errorType: "String/Type",
      },
    ]);
  });

  it("returns error if passed required option and no value is passed", () => {
    type IObjectSchema = {
      name: string;
    };

    const objectSchema = SchemaType.object<IObjectSchema>().keys({
      name: SchemaType.string().required(),
    });

    const { valid, value, errors } = objectSchema.validate({});

    expect(valid).toBe(false);
    expect(value).toEqual({});
    expect(errors).toEqual([
      {
        error: "name is required",
        errorType: "Object/InvalidKeys",
      },
    ]);
  });

  it("trim removes whitespaces", () => {
    type IObjectSchema = {
      name: string;
    };

    const objectSchema = SchemaType.object<IObjectSchema>().keys({
      name: SchemaType.string().trim(),
    });

    const testObj = {
      name: "   Lorem  ",
    };

    const { valid, value, errors } = objectSchema.validate(testObj);

    expect(valid).toBe(true);
    expect(value).toEqual({
      name: "Lorem",
    });
    expect(errors).toEqual([]);
  });

  it("minLength throws an error if string is lesser than specified value", () => {
    type IObjectSchema = {
      name: string;
    };

    const objectSchema = SchemaType.object<IObjectSchema>().keys({
      name: SchemaType.string().minLength(5),
    });

    const testObj = {
      name: "test",
    };

    const { valid, value, errors } = objectSchema.validate(testObj);

    expect(valid).toBe(false);
    expect(value).toEqual({});
    expect(errors).toEqual([
      {
        error: "minimum allowed length for name is 5",
        errorType: "String/Length",
      },
    ]);
  });

  it("maxLength throws an error if string is greater than specified value", () => {
    type IObjectSchema = {
      name: string;
    };

    const objectSchema = SchemaType.object<IObjectSchema>().keys({
      name: SchemaType.string().maxLength(5),
    });

    const testObj = {
      name: "123456",
    };

    const { valid, value, errors } = objectSchema.validate(testObj);

    expect(valid).toBe(false);
    expect(value).toEqual({});
    expect(errors).toEqual([
      {
        error: "maximum allowed length for name is 5",
        errorType: "String/Length",
      },
    ]);
  });

  it("lowercase formats the string to lowercase value", () => {
    type IObjectSchema = {
      name: string;
    };

    const objectSchema = SchemaType.object<IObjectSchema>().keys({
      name: SchemaType.string().lowercase(),
    });

    const testObj = {
      name: "Lorem",
    };

    const { valid, value, errors } = objectSchema.validate(testObj);

    expect(valid).toBe(true);
    expect(value).toEqual({
      name: "lorem",
    });
    expect(errors).toEqual([]);
  });

  it("uppercase formats the string to uppercase value", () => {
    type IObjectSchema = {
      name: string;
    };

    const objectSchema = SchemaType.object<IObjectSchema>().keys({
      name: SchemaType.string().uppercase(),
    });

    const testObj = {
      name: "lorem",
    };

    const { valid, value, errors } = objectSchema.validate(testObj);

    expect(valid).toBe(true);
    expect(value).toEqual({
      name: "LOREM",
    });
    expect(errors).toEqual([]);
  });

  it("email validates successfully if passed a proper email", () => {
    type IObjectSchema = {
      name: string;
    };

    const objectSchema = SchemaType.object<IObjectSchema>().keys({
      name: SchemaType.string().email(),
    });

    const testObj = {
      name: "lorem@gmail.com",
    };

    const { valid, value, errors } = objectSchema.validate(testObj);

    expect(valid).toBe(true);
    expect(value).toEqual({
      name: "lorem@gmail.com",
    });
    expect(errors).toEqual([]);
  });

  it("email throws an error if passed an invalid email", () => {
    type IObjectSchema = {
      name: string;
    };

    const objectSchema = SchemaType.object<IObjectSchema>().keys({
      name: SchemaType.string().email(),
    });

    const testObj = {
      name: "lorem.com",
    };

    const { valid, value, errors } = objectSchema.validate(testObj);

    expect(valid).toBe(false);
    expect(value).toEqual({});
    expect(errors).toEqual([
      {
        error: "name must be a valid email",
        errorType: "String/Format",
      },
    ]);
  });

  it("regex validates incoming string", () => {
    type IObjectSchema = {
      name: string;
    };

    const objectSchema = SchemaType.object<IObjectSchema>().keys({
      name: SchemaType.string().regex(/^[a-zA-Z]+$/),
    });

    const testObj = {
      name: "Lorem",
    };

    const { valid, value, errors } = objectSchema.validate(testObj);

    expect(valid).toBe(true);
    expect(value).toEqual({
      name: "Lorem",
    });
    expect(errors).toEqual([]);
  });

  it("regex throws an error if regex does not match", () => {
    type IObjectSchema = {
      name: string;
    };

    const objectSchema = SchemaType.object<IObjectSchema>().keys({
      name: SchemaType.string().regex(/^[a-zA-Z]+$/),
    });

    const testObj = {
      name: "123",
    };

    const { valid, value, errors } = objectSchema.validate(testObj);

    expect(valid).toBe(false);
    expect(value).toEqual({});
    expect(errors).toEqual([
      {
        error: "name must be of valid format",
        errorType: "String/Format",
      },
    ]);
  });

  it("enum only allows the specified values", () => {
    type IObjectSchema = {
      name: string;
    };

    const objectSchema = SchemaType.object<IObjectSchema>().keys({
      name: SchemaType.string().enum(["Lorem", "Ipsum"]),
    });

    const testObj = {
      name: "Lorem",
    };

    const { valid, value, errors } = objectSchema.validate(testObj);

    expect(valid).toBe(true);
    expect(value).toEqual({
      name: "Lorem",
    });
    expect(errors).toEqual([]);
  });

  it("enum throws an error if value is not in the enum", () => {
    type IObjectSchema = {
      name: string;
    };

    const objectSchema = SchemaType.object<IObjectSchema>().keys({
      name: SchemaType.string().enum(["Lorem", "Ipsum"]),
    });

    const testObj = {
      name: "123",
    };

    const { valid, value, errors } = objectSchema.validate(testObj);

    expect(valid).toBe(false);
    expect(value).toEqual({});
    expect(errors).toEqual([
      {
        error: "name is not assignable to specified enum",
        errorType: "String/InvalidValue",
      },
    ]);
  });
});
