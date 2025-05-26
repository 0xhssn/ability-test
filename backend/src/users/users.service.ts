import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom, catchError } from 'rxjs'
import { UserDto, UserPaginationDto } from './user.dto'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class UserService {
  private baseUrl: string

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get<string>(
      'PROXY_TARGET_URL',
      'https://jsonplaceholder.typicode.com',
    )
  }

  async findAll(paginationDto: UserPaginationDto): Promise<UserDto[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<UserDto[]>(`${this.baseUrl}/users`).pipe(
          catchError((error) => {
            throw new HttpException(
              `Failed to fetch users: ${error.message}`,
              HttpStatus.BAD_GATEWAY,
            )
          }),
        ),
      )

      let users = response.data

      if (
        paginationDto.page !== undefined &&
        paginationDto.limit !== undefined
      ) {
        const startIndex = (paginationDto.page - 1) * paginationDto.limit
        const endIndex = startIndex + paginationDto.limit
        users = users.slice(startIndex, endIndex)
      }

      return users
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch users',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async findOne(id: number): Promise<UserDto> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<UserDto>(`${this.baseUrl}/users/${id}`).pipe(
          catchError((error) => {
            throw new HttpException(
              `Failed to fetch user with ID ${id}: ${error.message}`,
              HttpStatus.BAD_GATEWAY,
            )
          }),
        ),
      )

      return response.data
    } catch (error) {
      throw new HttpException(
        error.message || `Failed to fetch user with ID ${id}`,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
