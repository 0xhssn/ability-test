export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
}

export interface ProxyLog {
  id: string
  method: HttpMethod
  url: string
  originalUrl: string
  proxyUrl: string
  userAgent?: string
  ip?: string
  userId?: string
  timestamp: string
  statusCode?: number
  responseTime?: number
  errorMessage?: string
  responseSize?: number
  createdAt: string
  updatedAt: string
} 