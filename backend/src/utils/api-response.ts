export function success<T>(data: T, message = "Success") {
  return {
    success: true as const,
    data,
    message,
  };
}

export function failure(message: string, errors: unknown[] = []) {
  return {
    success: false as const,
    message,
    errors,
  };
}
