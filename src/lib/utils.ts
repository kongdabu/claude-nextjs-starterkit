import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { type ApiResponse, type ErrorCode } from "@/types/api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const ERROR_MESSAGES: Record<ErrorCode, string> = {
  NOT_FOUND: "요청한 리소스를 찾을 수 없습니다.",
  VALIDATION_ERROR: "입력값이 유효하지 않습니다.",
  INTERNAL_ERROR: "서버 오류가 발생했습니다.",
  UNAUTHORIZED: "인증이 필요합니다.",
  FORBIDDEN: "접근 권한이 없습니다.",
  CONFLICT: "이미 존재하는 데이터입니다.",
};

export function successResponse<T>(data: T, message?: string): ApiResponse<T> {
  return { success: true, data, message };
}

export function errorResponse(code: ErrorCode): ApiResponse<null> {
  return {
    success: false,
    error: { code, message: ERROR_MESSAGES[code] },
  };
}
