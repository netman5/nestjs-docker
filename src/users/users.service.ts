import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async createUser(
    data: Prisma.UserCreateInput,
    createUserDto: CreateUserDto,
  ): Promise<User> {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAllUsers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOne(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    const user = this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async deleteUser(id: number): Promise<User> {
    const user = this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    return this.prisma.user.delete({
      where: { id },
    });
  }
}
