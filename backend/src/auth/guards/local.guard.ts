import { AuthGuard } from '@nestjs/passport'
import { Injectable, ExecutionContext } from '@nestjs/common'

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean
    return result
  }
}
