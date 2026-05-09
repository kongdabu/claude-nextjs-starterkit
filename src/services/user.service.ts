import { userRepository } from "@/repositories/user.repository";
import { type CreateUserDto, type UpdateUserDto, type UserResponseDto } from "@/dto/user.dto";

export const userService = {
  async getUsers(): Promise<UserResponseDto[]> {
    return userRepository.findAll();
  },

  async getUserById(id: number): Promise<UserResponseDto> {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new Error("NOT_FOUND");
    }
    return user;
  },

  async createUser(dto: CreateUserDto): Promise<UserResponseDto> {
    const existing = await userRepository.findByEmail(dto.email);
    if (existing) {
      throw new Error("CONFLICT");
    }
    return userRepository.create(dto);
  },

  async updateUser(id: number, dto: UpdateUserDto): Promise<UserResponseDto> {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new Error("NOT_FOUND");
    }

    if (dto.email && dto.email !== user.email) {
      const existing = await userRepository.findByEmail(dto.email);
      if (existing) {
        throw new Error("CONFLICT");
      }
    }

    const updated = await userRepository.update(id, dto);
    if (!updated) {
      throw new Error("NOT_FOUND");
    }
    return updated;
  },

  async deleteUser(id: number): Promise<void> {
    const deleted = await userRepository.delete(id);
    if (!deleted) {
      throw new Error("NOT_FOUND");
    }
  },
};
