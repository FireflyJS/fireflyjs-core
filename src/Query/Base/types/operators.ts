type OperatorValues = string | number | boolean | null | Date;

type Operators = {
  $gt?: OperatorValues;
  $gte?: OperatorValues;
  $lt?: OperatorValues;
  $lte?: OperatorValues;
  $eq?: OperatorValues;
  $neq?: OperatorValues;
  $ctn?: OperatorValues | OperatorValues[];
  $in?: OperatorValues[];
  $nin?: OperatorValues[];
};

export { Operators };
