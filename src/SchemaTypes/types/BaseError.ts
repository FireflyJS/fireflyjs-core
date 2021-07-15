interface BaseError<T = string> {
  error: string | null;
  errorType: T;
}

export default BaseError;
