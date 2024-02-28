"use client";

import BreadCrumb from "@/components/breadcrumb";
import { CompanyTable } from "@/components/tables/companies-table/table";

import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { useEffect, useState } from "react";

const breadcrumbItems = [{ title: "Companies", link: "/dashboard/companies" }];

export default function page() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result: any = await directus.request(
          readItems("Company", {
            fields: ["*"],
          }),
        );

        // Map over the result data and convert specific keys to lowercase
        const processedData = result.map((item: any) => ({
          ...item,
          title: item.Title,
          category: item.Category,
          company: item.Company,
          address: item.Address,
          status: item.Status,
        }));

        setCompanies(processedData);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    }

    fetchData();
  }, []);

  console.log({ companies });

  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <CompanyTable data={companies} />
      </div>
    </>
  );
}
