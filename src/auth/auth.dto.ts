import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator'

import { UserRole } from '../users/user.schema'
import { IsStrongPassword } from './decorators/isStrongPassword.decorator'

export class RegisterUserDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'User email address',
  })
  @IsEmail()
  email: string

  @ApiProperty({
    example: 'P@ssw0rd!',
    description: 'User password (minimum 6 characters)',
  })
  @IsString()
  @MinLength(8)
  @IsStrongPassword()
  password: string

  @ApiProperty({ example: 'John', description: 'User first name' })
  @IsString()
  firstName: string

  @ApiProperty({ example: 'Doe', description: 'User last name' })
  @IsString()
  lastName: string

  @ApiProperty({ example: 'admin', description: 'User role', required: false })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole
}

export class LoginDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'User email address',
  })
  @IsEmail()
  email: string

  @ApiProperty({
    example: 'P@ssw0rd!',
    description: 'User password (minimum 8 characters)',
  })
  @IsString()
  @MinLength(8)
  password: string
}

export class RefreshDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Refresh token for user',
  })
  @IsString()
  refreshToken: string
}
