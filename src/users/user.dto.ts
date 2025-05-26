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
  page?: number
  limit?: number
}
