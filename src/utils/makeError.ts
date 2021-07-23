const makeError = <T>(type: T, data: string | object) => {
  const error = {
    type,
    data,
  };

  return new Error(JSON.stringify(error));
};

export default makeError;
