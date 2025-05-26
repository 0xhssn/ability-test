import { Document } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Schema({ _id: false })
export class UserGeo {
  @ApiProperty({ example: '-31.8129' })
  @Prop({ required: true })
  lat: string

  @ApiProperty({ example: '62.5342' })
  @Prop({ required: true })
  lng: string
}

@Schema({ _id: false })
export class UserAddress {
  @ApiProperty({ example: 'Skiles Walks' })
  @Prop({ required: true })
  street: string

  @ApiProperty({ example: 'Suite 351' })
  @Prop({ required: true })
  suite: string

  @ApiProperty({ example: 'Roscoeview' })
  @Prop({ required: true })
  city: string

  @ApiProperty({ example: '33263' })
  @Prop({ required: true })
  zipcode: string

  @ApiProperty({ type: UserGeo })
  @Prop({ type: UserGeo, required: true })
  geo: UserGeo
}

@Schema({ _id: false })
export class UserCompany {
  @ApiProperty({ example: 'Keebler LLC' })
  @Prop({ required: true })
  name: string

  @ApiProperty({ example: 'User-centric fault-tolerant solution' })
  @Prop({ required: true })
  catchPhrase: string

  @ApiProperty({ example: 'revolutionize end-to-end systems' })
  @Prop({ required: true })
  bs: string
}

@Schema({
  timestamps: true,
  toJSON: {
    transform: (_doc, ret) => {
      delete ret.passwordHash
      return ret
    },
  },
})
export class User extends Document {
  @ApiProperty({ example: 5 })
  @Prop({ unique: true, required: true })
  id: number

  @ApiProperty({ example: 'Chelsey Dietrich' })
  @Prop({ required: true })
  name: string

  @ApiProperty({ example: 'Kamren' })
  @Prop({ required: true })
  username: string

  @ApiProperty({ example: 'Lucio_Hettinger@annie.ca' })
  @Prop({ unique: true, sparse: true })
  email: string

  @ApiProperty({ type: UserAddress })
  @Prop({ type: UserAddress, required: true })
  address: UserAddress

  @ApiProperty({ example: '(254)954-1289' })
  @Prop({ required: true })
  phone: string

  @ApiProperty({ example: 'demarco.info' })
  @Prop({ required: true })
  website: string

  @ApiProperty({ type: UserCompany })
  @Prop({ type: UserCompany, required: true })
  company: UserCompany

  @ApiPropertyOptional({ example: '$2b$10$...' })
  @Prop({ required: false })
  passwordHash?: string

  @ApiProperty({
    enum: UserRole,
    example: UserRole.USER,
    default: UserRole.USER,
  })
  @Prop({ type: String, enum: UserRole, default: UserRole.USER })
  role: UserRole
}

export const UserSchema = SchemaFactory.createForClass(User)
