import { userRepository } from "@/repositories/user.repository";
import { type UserResponseDto } from "@/dto/user.dto";

export const authService = {
  // 데모용 간략 로그인 (이메일 존재 여부만 확인, 실제 운영 시 bcrypt 비밀번호 검증 필요)
  async login(email: string): Promise<UserResponseDto> {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error("NOT_FOUND");
    }
    return user;
  },
};
