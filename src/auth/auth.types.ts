import { Request } from 'express'
import { ApiProperty } from '@nestjs/swagger'

import { UserRole } from '../users/user.schema'

export interface ContextUser {
  id: string
  username: string
  role: UserRole
  userId: string
}

export class AccessToken {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT access token',
  })
  access_token: string
}

export class AuthTokens extends AccessToken {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT refresh token',
  })
  refresh_token: string
}

export interface AuthenticatedRequest extends Request {
  user: ContextUser
}
