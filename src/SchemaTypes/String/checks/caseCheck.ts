const uppercaseCheck = (x: string): boolean => {
  if (x === x.toUpperCase()) return true;

  return false;
};

const lowercaseCheck = (x: string): boolean => {
  if (x === x.toLowerCase()) return true;

  return false;
};

export { lowercaseCheck, uppercaseCheck };
