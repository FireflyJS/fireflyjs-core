const typeCheck = (x: any): x is string => {
  if (typeof x === "string") return true;

  return false;
};

export { typeCheck };
