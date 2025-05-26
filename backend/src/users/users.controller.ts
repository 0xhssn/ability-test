import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common'
import { UserService } from './users.service'
import { UserDto, UserPaginationDto } from './user.dto'
import { JwtGuard } from '../auth/guards/jwt.guard'

@Controller('api/users')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Query() paginationDto: UserPaginationDto): Promise<UserDto[]> {
    return this.userService.findAll(paginationDto)
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserDto> {
    return this.userService.findOne(+id)
  }
}
