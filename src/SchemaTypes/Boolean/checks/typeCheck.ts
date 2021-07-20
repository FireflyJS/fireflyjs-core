const typeCheck = (x: any): x is boolean => {
  if (typeof x === "boolean") {
    return true;
  }
  return false;
};

export { typeCheck };
