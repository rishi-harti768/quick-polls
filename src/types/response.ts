export interface StandardResponse<T> {
  success: boolean;
  status: number;
  message: string;
  data?: T | null;
  error?: ErrorResponse | null;
  metadata: ResponseMetadata;
}

export interface ErrorResponse {
  code: string;
  details: string;
}

export interface ResponseMetadata {
  service: string;
  version: string;
  timestamp?: string;
}
