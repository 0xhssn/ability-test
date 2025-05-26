import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { AuthUser } from './auth-user.schema'
import { ContextUser } from './auth.types'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthUser.name) private authUserModel: Model<AuthUser>,
    private jwtService: JwtService,
  ) {
    this.initializeDefaultUser()
  }

  private async initializeDefaultUser() {
    const count = await this.authUserModel.countDocuments()
    if (count === 0) {
      try {
        await this.authUserModel.create({
          username: 'admin',
          password: 'admin123',
          role: 'admin',
          firstName: 'Admin',
          lastName: 'User',
          email: 'admin@example.com',
          isVerified: true,
          isActive: true,
        })
        console.log('Default admin user created')
      } catch (error) {
        console.error('Error creating default admin user:', error)
      }
    }
  }

  async validateUser(username: string, password: string): Promise<AuthUser> {
    const user = await this.authUserModel
      .findOne({ username, isActive: true })
      .exec()

    // if (!user) {
    //   throw new UnauthorizedException('Invalid credentials')
    // }

    // const isPasswordValid = await user.comparePassword(password)

    // if (!isPasswordValid) {
    //   throw new UnauthorizedException('Invalid credentials')
    // }

    return user
  }

  async login(user: AuthUser): Promise<{ access_token: string }> {
    const payload = {
      username: user.username,
      sub: user.id,
      role: user.role,
    }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async register(registerDto: {
    username: string
    password: string
    firstName?: string
    lastName?: string
    email?: string
  }) {
    const existingUser = await this.authUserModel
      .findOne({ username: registerDto.username })
      .exec()
    if (existingUser) {
      throw new ConflictException('Username already exists')
    }

    const newUser = new this.authUserModel({
      username: registerDto.username,
      password: registerDto.password,
      role: 'user',
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      email: registerDto.email,
      isVerified: false,
      isActive: true,
    })

    await newUser.save()

    return {
      id: newUser._id,
      username: newUser.username,
      role: newUser.role,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
    }
  }

  async getProfile(userId: string) {
    const user = await this.authUserModel.findById(userId).exec()
    if (!user) {
      throw new UnauthorizedException('User not found')
    }

    return {
      id: user._id,
      username: user.username,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isVerified: user.isVerified,
      isActive: user.isActive,
    }
  }
}
