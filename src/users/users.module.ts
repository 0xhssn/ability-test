import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { UserService } from './users.service'
import { UserController } from './users.controller'
import { User, UserSchema } from './user.schema'
import { HttpModule } from '@nestjs/axios'
import { ProxyModule } from '../proxy-log/proxy.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    HttpModule,
    ProxyModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
