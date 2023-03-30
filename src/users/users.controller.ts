import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto> {
    try {
      return this.usersService.createUser(createUserDto);
    } catch (error) {
      return error.message;
    }
  }

  @Get()
  findAll() {
    try {
      return this.usersService.findAllUsers({ orderBy: { id: 'asc' } });
    } catch (error) {
      return error.message;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
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
