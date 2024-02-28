"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";

export const EmployeesTable = ({ data }: any) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Employees (${data.length})`}
          description="Manage employees"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/employees/create`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />

      <DataTable searchKey="Name" columns={columns} data={data} />
    </>
  );
};
