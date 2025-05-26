import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ProxyLog } from './proxy-log.schema'
import { Request, Response } from 'express'
import { paginate, PaginatedResult } from '../common/paginate'

@Injectable()
export class ProxyLogService {
  constructor(
    @InjectModel(ProxyLog.name) private proxyLogModel: Model<ProxyLog>,
  ) {}

  async createLog(
    req: Request,
    res: Response,
    startTime: number,
  ): Promise<ProxyLog> {
    const endTime = Date.now()
    const responseTime = endTime - startTime

    const log = new this.proxyLogModel({
      method: req.method,
      url: req.originalUrl,
      timestamp: new Date(),
      headers: req.headers,
      query: req.query,
      body: req.body,
      responseTime,
      statusCode: res.statusCode,
    })

    return log.save()
  }

  async findAll(
    page = 1,
    limit = 10,
    filters: Record<string, any> = {},
  ): Promise<PaginatedResult<ProxyLog>> {
    const query: any = {}

    if (filters.method) {
      query.method = filters.method
    }

    if (filters.url) {
      query.url = { $regex: filters.url, $options: 'i' }
    }

    if (filters.statusCode) {
      query.statusCode = filters.statusCode
    }

    if (filters.startDate && filters.endDate) {
      query.timestamp = {
        $gte: new Date(filters.startDate),
        $lte: new Date(filters.endDate),
      }
    } else if (filters.startDate) {
      query.timestamp = { $gte: new Date(filters.startDate) }
    } else if (filters.endDate) {
      query.timestamp = { $lte: new Date(filters.endDate) }
    }

    return paginate(this.proxyLogModel, {
      page,
      limit,
      query,
      order: { timestamp: -1 },
    })
  }

  async clearLogs(): Promise<void> {
    await this.proxyLogModel.deleteMany({})
  }
}
