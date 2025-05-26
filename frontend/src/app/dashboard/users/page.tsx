"use client"

import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { User } from "@/types/user"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { usersApi } from "@/lib/api/users"
import { useState } from "react"

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "company.name",
    header: "Company",
  },
  {
    accessorKey: "address.city",
    header: "City",
  },
]

export default function UsersPage() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const { data, isLoading } = useQuery({
    queryKey: ["users", page, limit],
    queryFn: () => usersApi.findAll({ page, limit }),
  })

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Users</h1>
      <DataTable 
        columns={columns} 
        data={data || []} 
        searchKey="name" 
        isLoading={isLoading}
        pageCount={!isLoading && data?.length ? page + 1 : 0}
        page={page}
        pageSize={limit}
        onPageChange={setPage}
        onPageSizeChange={setLimit}
      />
    </div>
  )
}
