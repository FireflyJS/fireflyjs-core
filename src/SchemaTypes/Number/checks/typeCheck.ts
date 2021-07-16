const typeCheck = (x: any): x is number => {
  if (typeof x === "number") return true;

  return false;
};

export { typeCheck };
