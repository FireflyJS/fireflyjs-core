const enumCheck = (x: number, allowedVals: number[]): boolean => {
  if (allowedVals.includes(x)) return true;

  return false;
};

export { enumCheck };
