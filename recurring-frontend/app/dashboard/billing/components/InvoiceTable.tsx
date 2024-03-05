"use client";

import { TanStackDataTable } from "@/components/custom/TanStackDataTable";
import { columns } from "./invoiceColumns";
import EmptyBill from "@/components/empty/EmptyProjects";

interface Props {
  data: any;
}

const InvoiceTable = ({ data }: Props) => {
  return data ? (
    <div className="pt-5">
      {data && (
        <TanStackDataTable
          columns={columns}
          data={data}
          pageTitle="Subscription History"
          searchField="number"
          //   newButton={<CreateProjectButton slug={slug} />}
          //   rowOnCLick={rowOnCLick}
        />
      )}
    </div>
  ) : (
    <div className="m-5 h-96 flex flex-col items-center justify-center border rounded-lg">
      <EmptyBill />
      <p>No invoices available</p>
    </div>
  );
};

export default InvoiceTable;
