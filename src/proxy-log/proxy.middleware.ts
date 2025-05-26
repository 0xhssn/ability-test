import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { ProxyLogService } from './proxy-log.service'
import { ProxyRuleService } from '../proxy-rule/proxy-rule.service'
import { ConfigService } from '@nestjs/config'

// Extend the Request interface to include custom properties
declare module 'express' {
  interface Request {
    startTime?: number
  }
}

@Injectable()
export class ProxyMiddleware implements NestMiddleware {
  private proxy: ReturnType<typeof createProxyMiddleware>

  constructor(
    private readonly proxyLogService: ProxyLogService,
    private readonly proxyRuleService: ProxyRuleService,
    private readonly configService: ConfigService,
  ) {
    const targetUrl = this.configService.get<string>(
      'PROXY_TARGET_URL',
      'https://jsonplaceholder.typicode.com',
    )

    this.proxy = createProxyMiddleware({
      target: targetUrl,
      changeOrigin: true,
      pathRewrite: {
        '^/proxy': '',
      },
      onProxyReq: (proxyReq, req: Request) => {
        if (req.body) {
          const bodyData = JSON.stringify(req.body)
          proxyReq.setHeader('Content-Type', 'application/json')
          proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData))
          proxyReq.write(bodyData)
        }

        req.startTime = Date.now()
      },
      onProxyRes: async (proxyRes, req: Request, res: Response) => {
        const path = req.originalUrl.replace(/^\/proxy/, '')

        try {
          const shouldLog = await this.proxyRuleService.shouldLogRequest(path)
          if (shouldLog) {
            await this.proxyLogService.createLog(req, res, req.startTime)
          }
        } catch (error) {
          console.error('Error logging proxy request:', error)
        }
      },
    } as any) // Type assertion to bypass strict typing for event handlers
  }

  use(req: Request, res: Response, next: NextFunction): void {
    if (req.path.startsWith('/proxy')) {
      this.proxy(req, res, next)
      return
    }
    next()
  }
}
