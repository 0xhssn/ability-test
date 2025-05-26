import { Model, FilterQuery, SortOrder, PopulateOptions } from 'mongoose'

interface PaginationOptions<T> {
  page?: number
  limit?: number
  query?: FilterQuery<T>
  order?: { [key in keyof T]?: SortOrder }
  relations?: PopulateOptions | PopulateOptions[]
}

export interface PaginatedResult<T> {
  data: T[]
  total: number
  page: number
  lastPage: number
}

export async function paginate<T>(
  model: Model<T>,
  {
    page = 1,
    limit = 10,
    query = {},
    order = { createdAt: -1 } as { [key in keyof T]?: SortOrder },
    relations = [],
  }: PaginationOptions<T>,
): Promise<PaginatedResult<T>> {
  const skip = (page - 1) * limit
  const queryExec = model.find(query).sort(order).skip(skip).limit(limit)

  if (relations) {
    queryExec.populate(relations)
  }

  const [data, total] = await Promise.all([
    queryExec.exec(),
    model.countDocuments(query),
  ])

  const lastPage = Math.ceil(total / limit)

  return {
    data,
    total,
    page,
    lastPage,
  }
}
