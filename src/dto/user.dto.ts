import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요.").max(100, "이름은 100자 이내여야 합니다."),
  email: z.string().email("유효한 이메일 주소를 입력해주세요."),
});

export const updateUserSchema = createUserSchema.partial();

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;

export interface UserResponseDto {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
