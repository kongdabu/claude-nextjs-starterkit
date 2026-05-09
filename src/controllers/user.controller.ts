import { NextResponse } from "next/server";
import { userService } from "@/services/user.service";
import { createUserSchema, updateUserSchema } from "@/dto/user.dto";
import { successResponse, errorResponse } from "@/lib/utils";
import { type ErrorCode } from "@/types/api";

function handleError(error: unknown): NextResponse {
  if (error instanceof Error) {
    const code = error.message as ErrorCode;
    if (["NOT_FOUND", "VALIDATION_ERROR", "CONFLICT", "UNAUTHORIZED", "FORBIDDEN"].includes(code)) {
      const status = code === "NOT_FOUND" ? 404 : code === "UNAUTHORIZED" ? 401 : code === "FORBIDDEN" ? 403 : 409;
      return NextResponse.json(errorResponse(code), { status });
    }
  }
  console.error("[Controller Error]", error);
  return NextResponse.json(errorResponse("INTERNAL_ERROR"), { status: 500 });
}

export const userController = {
  async getUsers(): Promise<NextResponse> {
    try {
      const users = await userService.getUsers();
      return NextResponse.json(successResponse(users));
    } catch (error) {
      return handleError(error);
    }
  },

  async getUser(id: string): Promise<NextResponse> {
    try {
      const userId = Number(id);
      if (isNaN(userId)) {
        return NextResponse.json(errorResponse("VALIDATION_ERROR"), { status: 400 });
      }
      const user = await userService.getUserById(userId);
      return NextResponse.json(successResponse(user));
    } catch (error) {
      return handleError(error);
    }
  },

  async createUser(request: Request): Promise<NextResponse> {
    try {
      const body = await request.json();
      const parsed = createUserSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(errorResponse("VALIDATION_ERROR"), { status: 400 });
      }
      const user = await userService.createUser(parsed.data);
      return NextResponse.json(successResponse(user, "사용자가 생성되었습니다."), { status: 201 });
    } catch (error) {
      return handleError(error);
    }
  },

  async updateUser(id: string, request: Request): Promise<NextResponse> {
    try {
      const userId = Number(id);
      if (isNaN(userId)) {
        return NextResponse.json(errorResponse("VALIDATION_ERROR"), { status: 400 });
      }
      const body = await request.json();
      const parsed = updateUserSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(errorResponse("VALIDATION_ERROR"), { status: 400 });
      }
      const user = await userService.updateUser(userId, parsed.data);
      return NextResponse.json(successResponse(user, "사용자 정보가 수정되었습니다."));
    } catch (error) {
      return handleError(error);
    }
  },

  async deleteUser(id: string): Promise<NextResponse> {
    try {
      const userId = Number(id);
      if (isNaN(userId)) {
        return NextResponse.json(errorResponse("VALIDATION_ERROR"), { status: 400 });
      }
      await userService.deleteUser(userId);
      return NextResponse.json(successResponse(null, "사용자가 삭제되었습니다."));
    } catch (error) {
      return handleError(error);
    }
  },
};
