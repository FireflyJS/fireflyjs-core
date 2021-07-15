import Joi from "joi";

const { error } = Joi.string().uppercase().validate("5", { convert: false });

console.log(error);
