import { Document } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
}

@Schema({
  timestamps: true,
  toJSON: {
    transform: (_doc, ret) => {
      ret.id = ret._id
      delete ret._id
      // delete ret.__v
      return ret
    },
  },
})
export class ProxyLog extends Document {
  @ApiProperty({
    enum: HttpMethod,
    example: HttpMethod.GET,
    description: 'HTTP method used for the request',
  })
  @Prop({
    required: true,
    type: String,
    enum: HttpMethod,
    uppercase: true,
  })
  method: HttpMethod

  @ApiProperty({
    example: '/proxy/users',
    description: 'The request URL path',
  })
  @Prop({ required: true })
  url: string

  @ApiProperty({
    example: '/proxy/users?page=1',
    description: 'The original request URL with query parameters',
  })
  @Prop({ required: true })
  originalUrl: string

  @ApiProperty({
    example: 'https://jsonplaceholder.typicode.com/users',
    description: 'The target URL that was proxied to',
  })
  @Prop({ required: true })
  proxyUrl: string

  @ApiPropertyOptional({
    example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    description: 'User agent string from the request headers',
  })
  @Prop()
  userAgent?: string

  @ApiPropertyOptional({
    example: '192.168.1.100',
    description: 'IP address of the client making the request',
  })
  @Prop()
  ip?: string

  @ApiPropertyOptional({
    example: '507f1f77bcf86cd799439011',
    description: 'ID of the user who made the request',
  })
  @Prop()
  userId?: string

  @ApiProperty({
    example: '2024-01-15T10:30:00.000Z',
    description: 'Timestamp when the request was made',
  })
  @Prop({ required: true, type: Date })
  timestamp: Date

  @ApiPropertyOptional({
    example: 200,
    description: 'HTTP status code returned by the proxied request',
  })
  @Prop({
    type: Number,
    min: 100,
    max: 599,
  })
  statusCode?: number

  @ApiPropertyOptional({
    example: 245,
    description: 'Response time in milliseconds',
  })
  @Prop({
    type: Number,
    min: 0,
  })
  responseTime?: number

  @ApiPropertyOptional({
    example: 'Internal Server Error',
    description: 'Error message if the request failed',
  })
  @Prop()
  errorMessage?: string

  @ApiPropertyOptional({
    example: 1024,
    description: 'Size of the response body in bytes',
  })
  @Prop({
    type: Number,
    min: 0,
  })
  responseSize?: number
}

export const ProxyLogSchema = SchemaFactory.createForClass(ProxyLog)

ProxyLogSchema.index({ userId: 1, timestamp: -1 })
ProxyLogSchema.index({ method: 1 })
ProxyLogSchema.index({ statusCode: 1 })
ProxyLogSchema.index({ timestamp: -1 })
ProxyLogSchema.index({ proxyUrl: 1 })
