import type {
    ErrorResponse,
    ResponseMetadata,
    StandardResponse,
} from "@/types/response.js";

export const successResponse = <T>(
  status: number,
  message: string,
  metadata: ResponseMetadata,
  data?: T
) => {
  return {
    status,
    success: true,
    message,
    data: data ? data : undefined,
    error: undefined,
    metadata: {
      service: metadata.service,
      timestamp: metadata.timestamp
        ? metadata.timestamp
        : new Date().toISOString(),
      version: metadata.version,
    },
  } as StandardResponse<T>;
};

export const errorResponse = <T>(
  status: number,
  message: string,
  metadata: ResponseMetadata,
  error?: ErrorResponse
) => {
  return {
    status,
    success: false,
    message,
    data: undefined,
    error: error
      ? error
      : {
          code: "UNKNOWN_ERROR",
          details: "Unavailable",
        },
    metadata: {
      service: metadata.service,
      timestamp: metadata.timestamp
        ? metadata.timestamp
        : new Date().toISOString(),
      version: metadata.version,
    },
  } as StandardResponse<T>;
};
