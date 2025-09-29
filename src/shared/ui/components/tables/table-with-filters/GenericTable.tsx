import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { useState } from "react";

type GenericTableProps<T> = {
  title?: string;
  data: T[];
  columns: { field: keyof T; header: string; filter?: boolean }[];
};

export function GenericTable<T extends { id: number }>({
  title = "Data Table",
  data,
  columns,
}: GenericTableProps<T>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedRow, setSelectedRow] = useState<T | null>(null);

  const filterElement = (field: keyof T) => {
    const uniqueValues = Array.from(new Set(data.map((d) => d[field])));
    return (
      <MultiSelect
        value={[]}
        options={uniqueValues}
        placeholder="Filter..."
        className="p-column-filter w-full"
        showClear
      />
    );
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4 w-full">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          {title}
        </h2>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
            className="p-inputtext-sm"
          />
        </span>
      </div>

      <DataTable
        value={data}
        paginator
        rows={10}
        stripedRows
        removableSort
        globalFilter={globalFilter}
        filterDisplay="row"
        selectionMode="single"
        onRowClick={(e) => setSelectedRow(e.data as T)}
        emptyMessage="No records found"
        className="w-full p-5"
      >
        {columns.map((col) => (
          <Column
            key={String(col.field)}
            field={String(col.field)}
            header={col.header}
            sortable
            filter={col.filter}
            filterElement={col.filter ? filterElement(col.field) : undefined}
            headerClassName="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium py-5 px-3"
            className="text-sm py-5 px-5"
          />
        ))}
      </DataTable>

      <Dialog
        header="Record Details"
        visible={!!selectedRow}
        onHide={() => setSelectedRow(null)}
        style={{ width: "40vw" }}
        className="rounded-xl"
      >
        {selectedRow && (
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(selectedRow).map(([key, value]) => (
              <div key={key}>
                <p className="text-xs uppercase text-gray-400">{key}</p>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                  {String(value)}
                </p>
              </div>
            ))}
          </div>
        )}
      </Dialog>
    </div>
  );
}
