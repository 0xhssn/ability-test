import api from '@/lib/axios'
import { PaginatedResult } from '@/types/api'
import { ProxyLog } from '@/types/proxy-log'

export interface ProxyLogFilters {
  page?: number
  limit?: number
  method?: string
  url?: string
  statusCode?: number
  startDate?: string
  endDate?: string
}

export const getProxyLogs = async (filters: ProxyLogFilters = {}): Promise<PaginatedResult<ProxyLog>> => {
  const queryParams = new URLSearchParams()
  
  if (filters.page) queryParams.append('page', filters.page.toString())
  if (filters.limit) queryParams.append('limit', filters.limit.toString())
  if (filters.method) queryParams.append('method', filters.method)
  if (filters.url) queryParams.append('url', filters.url)
  if (filters.statusCode) queryParams.append('statusCode', filters.statusCode.toString())
  if (filters.startDate) queryParams.append('startDate', filters.startDate)
  if (filters.endDate) queryParams.append('endDate', filters.endDate)

  const response = await api.get(`/proxy-logs?${queryParams.toString()}`)
  return response.data
} 