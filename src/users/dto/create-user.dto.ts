import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty()
  @IsOptional()
  readonly name?: string;

  @ApiProperty()
  @IsNotEmpty()
  username: string;
  createdAt: Date;
  updatedAt: Date;

  @ApiProperty()
  role?: string;
}
