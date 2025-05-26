import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common'
import { ProxyRuleService } from './proxy-rule.service'
import { ProxyRule } from './proxy-rule.schema'
import { JwtGuard } from '../auth/guards/jwt.guard'

@Controller('api/proxy-rules')
@UseGuards(JwtGuard)
export class ProxyRuleController {
  constructor(private readonly proxyRuleService: ProxyRuleService) {}

  @Get()
  async findAll(): Promise<ProxyRule[]> {
    return this.proxyRuleService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProxyRule> {
    return this.proxyRuleService.findOne(id)
  }

  @Post()
  async create(
    @Body() createProxyRuleDto: Partial<ProxyRule>,
  ): Promise<ProxyRule> {
    return this.proxyRuleService.create(createProxyRuleDto)
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProxyRuleDto: Partial<ProxyRule>,
  ): Promise<ProxyRule> {
    return this.proxyRuleService.update(id, updateProxyRuleDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.proxyRuleService.remove(id)
    return { message: `Proxy rule with ID ${id} has been removed` }
  }

  @Patch(':id/toggle')
  async toggleStatus(@Param('id') id: string): Promise<ProxyRule> {
    return this.proxyRuleService.toggleStatus(id)
  }

  @Patch(':id/toggle-logging')
  async toggleLogging(@Param('id') id: string): Promise<ProxyRule> {
    return this.proxyRuleService.toggleLogging(id)
  }
}
