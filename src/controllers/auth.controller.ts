import { NextResponse } from "next/server";
import { loginSchema } from "@/dto/auth.dto";
import { authService } from "@/services/auth.service";
import { successResponse, errorResponse } from "@/lib/utils";

export const authController = {
  async login(request: Request): Promise<NextResponse> {
    try {
      const body: unknown = await request.json();
      const parsed = loginSchema.safeParse(body);

      if (!parsed.success) {
        return NextResponse.json(
          errorResponse("VALIDATION_ERROR"),
          { status: 400 },
        );
      }

      const user = await authService.login(parsed.data.email);
      return NextResponse.json(
        successResponse(user, "로그인되었습니다."),
        { status: 200 },
      );
    } catch (error) {
      const code = error instanceof Error ? error.message : "";
      if (code === "NOT_FOUND") {
        return NextResponse.json(
          errorResponse("NOT_FOUND"),
          { status: 404 },
        );
      }
      return NextResponse.json(
        errorResponse("INTERNAL_ERROR"),
        { status: 500 },
      );
    }
  },
};
