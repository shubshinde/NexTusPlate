"use client";

import BreadCrumb from "@/components/breadcrumb";
import { EmployeesTable } from "@/components/tables/employees-table/table";

import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { useEffect, useState } from "react";

const breadcrumbItems = [{ title: "Employees", link: "/dashboard/employees" }];

export default function page() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result: any = await directus.request(
          readItems("Employee", {
            fields: ["*"],
          }),
        );

        // Map over the result data and convert specific keys to lowercase
        const processedData = result.map((item: any) => ({
          ...item,
          name: item.Name,
          country: item.Country,
          company: item.Company,
          Gender: item.Gender.toUpperCase(),
          status: item.status.toUpperCase(),
        }));

        setEmployees(processedData);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    }

    fetchData();
  }, []);

  console.log({ employees });

  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <EmployeesTable data={employees} />
      </div>
    </>
  );
}
