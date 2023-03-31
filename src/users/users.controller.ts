import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CustomException } from '../Exceptions';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto> {
    try {
      return this.usersService.createUser(createUserDto);
    } catch (error) {
      throw new CustomException(
        'Check signup parameters and try again',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  findAll() {
    try {
      return this.usersService.findAllUsers({ orderBy: { id: 'asc' } });
    } catch (error) {
      throw new CustomException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    const checkUser = this.usersService.findUnique({
      where: { id },
    });

    if (!checkUser) {
      throw new CustomException('User does not exist', HttpStatus.NOT_FOUND);
    }
    try {
      return this.usersService.findOne(+id);
    } catch (error) {
      return error.message;
    }
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    const checkUser = this.usersService.findUnique({
      where: { id },
    });

    if (!checkUser) {
      throw new CustomException('User does not exist', HttpStatus.NOT_FOUND);
    }

    try {
      return this.usersService.updateUser(+id, updateUserDto);
    } catch (error) {
      return error.message;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      const response = await this.usersService.deleteUser(+id);
      if (response) {
        return 'User deleted successfully';
      }

      throw new CustomException('User does not exist', HttpStatus.NOT_FOUND);
    } catch (error) {
      return error.message;
    }
  }
}
