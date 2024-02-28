import BreadCrumb from "@/components/breadcrumb";
import { EmployeeForm } from "@/components/forms/employee-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

export default function Page() {
  const breadcrumbItems = [
    { title: "Employees", link: "/dashboard/employees" },
    { title: "Create", link: "/dashboard/employees/create" },
  ];
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <EmployeeForm
          companies={[
            { _id: "Uplers", name: "Uplers" },
            { _id: "Apple", name: "Apple" },
            { _id: "Google", name: "Google" },
          ]}
          genders={[
            { _id: "male", name: "Male" },
            { _id: "female", name: "Female" },
          ]}
          initialData={null}
          key={null}
        />
      </div>
    </ScrollArea>
  );
}
