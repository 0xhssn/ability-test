import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

import { AuthService } from '../auth.service'
import { User } from '../../users/user.schema'
import { AuthUser } from '../auth-user.schema'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      session: false,
    })
  }

  async validate(email: string, password: string): Promise<AuthUser> {
    return await this.authService.validateUser(email, password)
  }
}
