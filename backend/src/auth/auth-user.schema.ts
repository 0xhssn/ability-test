import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import * as bcrypt from 'bcrypt'

@Schema({ timestamps: true })
export class AuthUser extends Document {
  @Prop({ required: true, unique: true })
  username: string

  @Prop({ required: true })
  password: string

  @Prop({ default: 'user' })
  role: string

  @Prop()
  firstName: string

  @Prop()
  lastName: string

  @Prop()
  email: string

  @Prop({ default: false })
  isVerified: boolean

  @Prop({ default: true })
  isActive: boolean

  async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password)
  }
}

export const AuthUserSchema = SchemaFactory.createForClass(AuthUser)

AuthUserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    return next()
  } catch (error) {
    return next(error)
  }
})
