import { userController } from "@/controllers/user.controller";

export async function GET(): Promise<Response> {
  return userController.getUsers();
}

export async function POST(request: Request): Promise<Response> {
  return userController.createUser(request);
}
