export interface ApiResponseInfo {
  seed: string;
  results: 1;
  page: 1;
  version: string;
}

export interface ApiResponse<T> {
  results: T;
  info: ApiResponseInfo;
}
