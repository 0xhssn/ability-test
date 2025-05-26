import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common'

import { UserRole } from '../../users/user.schema'

@Injectable()
export class IsAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const user = request.user

    if (!user) {
      throw new ForbiddenException('User not authenticated')
    }

    if (user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('You do not have permission (Admin only)')
    }

    return true
  }
}
