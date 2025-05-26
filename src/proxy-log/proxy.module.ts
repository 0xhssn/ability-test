import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { HttpModule } from '@nestjs/axios'
import { ConfigModule } from '@nestjs/config'

import { ProxyLogService } from './proxy-log.service'
import { ProxyRuleService } from '../proxy-rule/proxy-rule.service'
import { ProxyLogController } from './proxy-log.controller'
import { ProxyRuleController } from '../proxy-rule/proxy-rule.controller'
import { ProxyMiddleware } from './proxy.middleware'
import { ProxyLog, ProxyLogSchema } from './proxy-log.schema'
import { ProxyRule, ProxyRuleSchema } from '../proxy-rule/proxy-rule.schema'
import { UserService } from '../users/users.service'
import { UserController } from '../users/users.controller'

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    MongooseModule.forFeature([
      { name: ProxyLog.name, schema: ProxyLogSchema },
      { name: ProxyRule.name, schema: ProxyRuleSchema },
    ]),
  ],
  controllers: [ProxyLogController, ProxyRuleController, UserController],
  providers: [ProxyLogService, ProxyRuleService, UserService],
  exports: [ProxyLogService, ProxyRuleService],
})
export class ProxyModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ProxyMiddleware)
      .forRoutes({ path: 'proxy/*', method: RequestMethod.ALL })
  }
}
