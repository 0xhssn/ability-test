import { ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsString,
  IsOptional,
  IsNumber,
  IsDate,
  IsNumberString,
  IsEnum,
} from 'class-validator'
import { HttpMethod } from './proxy-log.schema'

export class CreateProxyLogDto {
  @IsString()
  method: string

  @IsString()
  url: string

  @IsString()
  originalUrl: string

  @IsString()
  proxyUrl: string

  @IsOptional()
  @IsString()
  userAgent?: string

  @IsOptional()
  @IsString()
  ip?: string

  @IsOptional()
  @IsString()
  userId?: string

  @IsDate()
  timestamp: Date

  @IsOptional()
  @IsNumber()
  statusCode?: number

  @IsOptional()
  @IsNumber()
  responseTime?: number
}

export class ProxyQueryDto {
  @ApiPropertyOptional({ description: 'Page number', default: 1, minimum: 1 })
  @IsOptional()
  @IsNumberString()
  page?: string

  @ApiPropertyOptional({
    description: 'Number of items per page',
    default: 10,
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @IsNumberString()
  limit?: string

  @ApiPropertyOptional({
    enum: HttpMethod,
    description: 'HTTP method filter',
  })
  @IsOptional()
  @IsEnum(HttpMethod)
  method?: HttpMethod

  @ApiPropertyOptional({ description: 'User ID filter' })
  @IsOptional()
  @IsString()
  userId?: string

  @ApiPropertyOptional({
    description: 'Status code filter',
    minimum: 100,
    maximum: 599,
  })
  @IsOptional()
  @IsNumberString()
  statusCode?: string

  @ApiPropertyOptional({ description: 'Search term for URL' })
  @IsOptional()
  @IsString()
  search?: string

  @ApiPropertyOptional({ description: 'Start date for filtering (ISO string)' })
  @IsOptional()
  @IsString()
  startDate?: string

  @ApiPropertyOptional({ description: 'End date for filtering (ISO string)' })
  @IsOptional()
  @IsString()
  endDate?: string

  @ApiPropertyOptional({ description: 'Minimum response time filter (ms)' })
  @IsOptional()
  @IsNumberString()
  minResponseTime?: string

  @ApiPropertyOptional({ description: 'Maximum response time filter (ms)' })
  @IsOptional()
  @IsNumberString()
  maxResponseTime?: string
}
