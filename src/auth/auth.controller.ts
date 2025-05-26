import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Get,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { JwtGuard } from './guards/jwt.guard'
import { GetUser } from './decorators/user.decorator'
import { ContextUser } from './auth.types'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { username: string; password: string }) {
    try {
      const user = await this.authService.validateUser(
        loginDto.username,
        loginDto.password,
      )
      return this.authService.login(user)
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials')
    }
  }

  @Post('register')
  async register(
    @Body()
    registerDto: {
      username: string
      password: string
      firstName?: string
      lastName?: string
      email?: string
    },
  ) {
    return this.authService.register(registerDto)
  }

  @UseGuards(JwtGuard)
  @Get('profile')
  async getProfile(@GetUser() user: ContextUser) {
    return this.authService.getProfile(user.id)
  }
}
