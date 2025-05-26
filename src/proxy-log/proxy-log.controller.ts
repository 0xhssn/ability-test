import { Controller, Get, Query, Delete, UseGuards } from '@nestjs/common'
import { ProxyLogService } from './proxy-log.service'
import { PaginatedResult } from '../common/paginate'
import { ProxyLog } from './proxy-log.schema'
import { JwtGuard } from 'src/auth/guards/jwt.guard'

@Controller('proxy-logs')
@UseGuards(JwtGuard)
export class ProxyLogController {
  constructor(private readonly proxyLogService: ProxyLogService) {}

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('method') method?: string,
    @Query('url') url?: string,
    @Query('statusCode') statusCode?: number,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ): Promise<PaginatedResult<ProxyLog>> {
    const filters = {
      method,
      url,
      statusCode,
      startDate,
      endDate,
    }

    return this.proxyLogService.findAll(page, limit, filters)
  }

  @Delete()
  async clearLogs(): Promise<{ message: string }> {
    await this.proxyLogService.clearLogs()
    return { message: 'All logs have been cleared' }
  }
}
