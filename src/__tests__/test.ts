import * as SchemaType from "../SchemaTypes/index";

type IObjectSchema = {
  name: string;
  age: number;
  fullname: string;
  location: {
    houseNo: number;
    streetName: string;
  };
};

const objectSchema = SchemaType.object<IObjectSchema>().keys({
  name: SchemaType.string().required().uppercase(),
  age: SchemaType.number().required(),
  fullname: SchemaType.string().default("hello"),
  location: SchemaType.object()
    .keys({
      houseNo: SchemaType.number().required(),
      streetName: SchemaType.string().required().default("hell"),
    })
    .required(),
});

const test = {
  name: "aryaman",
  age: 10,
  location: {
    houseNo: 15,
  },
};

const { valid, value, errors } = objectSchema.validate(test);

console.log({ valid, value, errors });
