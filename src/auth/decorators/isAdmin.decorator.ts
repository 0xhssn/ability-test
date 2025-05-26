import { UseGuards, applyDecorators } from '@nestjs/common'

import { JwtGuard } from '../guards/jwt.guard'
import { IsAdminGuard } from '../guards/isAdmin.guard'

export function IsAdmin() {
  return applyDecorators(UseGuards(JwtGuard, IsAdminGuard))
}
