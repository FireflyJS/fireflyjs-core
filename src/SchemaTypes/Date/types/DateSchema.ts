import { Config as BaseConfig } from "../../Base";

interface DateSchemaConfig extends BaseConfig<Date> {
  greaterThan?: Date;
  greaterThanOrEqualTo?: Date;
  lessThan?: Date;
  lessThanOrEqualTo?: Date;
  equalTo?: Date;
}

export { DateSchemaConfig };
