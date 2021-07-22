const typeCheck = (x: any): x is Date => {
  if (x instanceof Date) return true;

  return false;
};

export { typeCheck };
