import { userController } from "@/controllers/user.controller";

type Params = Promise<{ id: string }>;

export async function GET(
  _request: Request,
  { params }: { params: Params }
): Promise<Response> {
  const { id } = await params;
  return userController.getUser(id);
}

export async function PUT(
  request: Request,
  { params }: { params: Params }
): Promise<Response> {
  const { id } = await params;
  return userController.updateUser(id, request);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Params }
): Promise<Response> {
  const { id } = await params;
  return userController.deleteUser(id);
}
