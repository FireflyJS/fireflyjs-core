import BaseSchemaConfig from "../../types/BaseSchema";

interface DateSchemaConfig extends BaseSchemaConfig<Date> {
  greaterThan?: Date;
  greaterThanOrEqualTo?: Date;
  lessThan?: Date;
  lessThanOrEqualTo?: Date;
  equalTo?: Date;
}

export { DateSchemaConfig };
