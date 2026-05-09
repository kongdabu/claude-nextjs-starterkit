import { type PoolClient } from "pg";
import { query } from "@/lib/db";
import { type CreateUserDto, type UpdateUserDto, type UserResponseDto } from "@/dto/user.dto";

export const userRepository = {
  async findAll(): Promise<UserResponseDto[]> {
    return query<UserResponseDto>(
      "SELECT id, name, email, created_at AS \"createdAt\", updated_at AS \"updatedAt\" FROM users ORDER BY id DESC"
    );
  },

  async findById(id: number): Promise<UserResponseDto | null> {
    const rows = await query<UserResponseDto>(
      "SELECT id, name, email, created_at AS \"createdAt\", updated_at AS \"updatedAt\" FROM users WHERE id = $1",
      [id]
    );
    return rows[0] ?? null;
  },

  async findByEmail(email: string): Promise<UserResponseDto | null> {
    const rows = await query<UserResponseDto>(
      "SELECT id, name, email, created_at AS \"createdAt\", updated_at AS \"updatedAt\" FROM users WHERE email = $1",
      [email]
    );
    return rows[0] ?? null;
  },

  async create(dto: CreateUserDto): Promise<UserResponseDto> {
    const rows = await query<UserResponseDto>(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email, created_at AS \"createdAt\", updated_at AS \"updatedAt\"",
      [dto.name, dto.email]
    );
    return rows[0];
  },

  async createWithClient(client: PoolClient, dto: CreateUserDto): Promise<UserResponseDto> {
    const result = await client.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email, created_at AS \"createdAt\", updated_at AS \"updatedAt\"",
      [dto.name, dto.email]
    );
    return result.rows[0] as UserResponseDto;
  },

  async update(id: number, dto: UpdateUserDto): Promise<UserResponseDto | null> {
    const fields: string[] = [];
    const values: unknown[] = [];
    let paramIndex = 1;

    if (dto.name !== undefined) {
      fields.push(`name = $${paramIndex++}`);
      values.push(dto.name);
    }
    if (dto.email !== undefined) {
      fields.push(`email = $${paramIndex++}`);
      values.push(dto.email);
    }

    if (fields.length === 0) return this.findById(id);

    values.push(id);
    const rows = await query<UserResponseDto>(
      `UPDATE users SET ${fields.join(", ")}, updated_at = NOW() WHERE id = $${paramIndex} RETURNING id, name, email, created_at AS "createdAt", updated_at AS "updatedAt"`,
      values
    );
    return rows[0] ?? null;
  },

  async delete(id: number): Promise<boolean> {
    const rows = await query<{ id: number }>(
      "DELETE FROM users WHERE id = $1 RETURNING id",
      [id]
    );
    return rows.length > 0;
  },
};
