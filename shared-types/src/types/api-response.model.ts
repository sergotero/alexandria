type ApiSuccess<T> = {
  success: true,
  data: T,
};

export type ApiError = {
  success: false,
  error: {
    message: string,
    statusCode: number,
  }
};

export type APIResponse<T> = ApiSuccess<T> | ApiError;