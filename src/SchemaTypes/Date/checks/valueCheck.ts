const greaterThanCheck = (x: Date, threshold: Date): boolean => {
  if (x.getTime() > threshold.getTime()) return true;

  return false;
};

const greaterThanOrEqualToCheck = (x: Date, threshold: Date): boolean => {
  if (x.getTime() >= threshold.getTime()) return true;

  return false;
};

const lessThanCheck = (x: Date, threshold: Date): boolean => {
  if (x.getTime() < threshold.getTime()) return true;

  return false;
};

const lessThanOrEqualToCheck = (x: Date, threshold: Date): boolean => {
  if (x.getTime() <= threshold.getTime()) return true;

  return false;
};

const equalToCheck = (x: Date, threshold: Date): boolean => {
  if (x.getTime() === threshold.getTime()) return true;

  return false;
};

export {
  greaterThanCheck,
  greaterThanOrEqualToCheck,
  lessThanCheck,
  lessThanOrEqualToCheck,
  equalToCheck,
};
