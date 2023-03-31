import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.prisma.user.create({
        data: createUserDto,
      });
    } catch (error) {
      return error.message;
    }
  }

  async findAllUsers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    try {
      return this.prisma.user.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      });
    } catch (error) {
      return error.message;
    }
  }

  async findUnique(params: {
    where: Prisma.UserWhereUniqueInput;
  }): Promise<User | null> {
    const { where } = params;
    try {
      return this.prisma.user.findUnique({
        where,
      });
    } catch (error) {
      return error.message;
    }
  }

  findOne(id: number): Promise<User | null> {
    try {
      const user = this.prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        return null;
      }
      return this.prisma.user.findUnique({
        where: { id },
      });
    } catch (error) {
      return error.message;
    }
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    try {
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
    } catch (error) {
      return error.message;
    }
  }

  async deleteUser(id: number): Promise<User> {
    try {
      const user = this.prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        return null;
      }

      return this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      return error.message;
    }
  }
}
