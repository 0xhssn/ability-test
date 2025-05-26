import { IsInt } from 'class-validator'
import { IsOptional } from 'class-validator'
import { Min } from 'class-validator'
import { Type } from 'class-transformer'

export class GeoDto {
  lat: string
  lng: string
}

export class AddressDto {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: GeoDto
}

export class CompanyDto {
  name: string
  catchPhrase: string
  bs: string
}

export class UserDto {
  id: number
  name: string
  username: string
  email: string
  address: AddressDto
  phone: string
  website: string
  company: CompanyDto
}

export class UserPaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number
}
