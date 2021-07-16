const enumCheck = (x: string, allowedValues: string[]): boolean => {
  if (allowedValues.includes(x)) return true;

  return false;
};

export { enumCheck };
