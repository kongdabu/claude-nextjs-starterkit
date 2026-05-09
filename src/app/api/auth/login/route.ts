import { authController } from "@/controllers/auth.controller";

export async function POST(request: Request): Promise<Response> {
  return authController.login(request);
}
