const minCheck = (x: number, val: number): boolean => {
  if (x >= val) return true;

  return false;
};

const maxCheck = (x: number, val: number): boolean => {
  if (x <= val) return true;

  return false;
};

export { minCheck, maxCheck };
