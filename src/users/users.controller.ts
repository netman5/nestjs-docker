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
import { CustomException, AllExceptionsFilter } from '../Exceptions';

@Controller('api/users')
// @UseFilters(AllExceptionsFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const checkUser = this.usersService.findUnique({
      where: { email: createUserDto.email },
    });

    if (checkUser) {
      throw new CustomException('User already exists', HttpStatus.BAD_REQUEST);
    }
    try {
      return this.usersService.createUser(createUserDto);
    } catch (error) {
      throw new CustomException(error.message, HttpStatus.BAD_REQUEST);
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
  findOne(@Param('id') id: string) {
    const checkUser = this.usersService.findUnique({
      where: { id: +id },
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
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return this.usersService.updateUser(+id, updateUserDto);
    } catch (error) {
      return error.message;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    try {
      return this.usersService.deleteUser(id);
    } catch (error) {
      return error.message;
    }
  }
}
