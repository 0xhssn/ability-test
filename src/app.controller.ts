import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'

import { AppService } from './app.service'
import { Public } from './auth/decorators/public.decorator'

@Public()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('ping')
  @HttpCode(HttpStatus.OK)
  getHello(): string {
    return this.appService.getHello()
  }
}
