import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: { name: string; email: string; password: string }) {
    return this.prisma.user.create({ data });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async updateUser(userId: number, dto: { name: string; password?: string }) {
    const updateData: any = {
      name: dto.name,
    };
  
    if (dto.password) {
      const hashedPassword = await bcrypt.hash(dto.password, 10);
      updateData.password = hashedPassword;
    }
  
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  
    return {
      message: 'Perfil actualizado correctamente',
      user: updatedUser,
    };
  }
}
