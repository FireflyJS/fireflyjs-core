const minlengthCheck = (x: string, len: number): boolean => {
  if (x.length >= len) return true;

  return false;
};

const maxlengthCheck = (x: string, len: number): boolean => {
  if (x.length <= len) return true;

  return false;
};

export { minlengthCheck, maxlengthCheck };
