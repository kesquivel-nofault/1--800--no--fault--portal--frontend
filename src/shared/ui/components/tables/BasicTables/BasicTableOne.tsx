import React, { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import { MultiSelect } from "primereact/multiselect";
import "../../../../../shared/ui/components/form/input/multi-select/styles.scss";
type Column<T> = {
  key: keyof T;
  header: string;
  filter?: {
    type: "text" | "select";
    options?: string[];
    multi?: boolean;
  };
  render?: (row: T) => React.ReactNode;
};

interface GenericTableProps<T> {
  title?: string;
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  onRowClick?: (row: T) => void;
}

export function GenericTable<T extends { id: number }>({
  data,
  columns,
  pageSize = 5,
  onRowClick,
}: GenericTableProps<T>) {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string | string[]>>({});
  const [page, setPage] = useState(1);

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const matchesSearch = Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        if (!value || (Array.isArray(value) && value.length === 0)) return true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const cellValue = String((row as any)[key]);
        if (Array.isArray(value)) {
          return value.includes(cellValue);
        }
        return cellValue.includes(value);
      });

      return matchesSearch && matchesFilters;
    });
  }, [data, search, filters]);

  const start = (page - 1) * pageSize;
  const paginatedData = filteredData.slice(start, start + pageSize);
  const totalPages = Math.ceil(filteredData.length / pageSize);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-b border-gray-200 dark:border-white/[0.05]">
        <div className="flex flex-col w-full gap-3 md:flex-row md:items-center md:w-auto">
          {columns
            .filter((c) => c.filter)
            .map((col) => {
              const filter = col.filter!;
              if (filter.type === "text") {
                return (
                  <input
                    key={String(col.key)}
                    type="text"
                    placeholder={`Filter ${col.header}`}
                    value={(filters[col.key as string] as string) || ""}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        [col.key]: e.target.value,
                      }))
                    }
                    className="px-3 py-2 text-sm border rounded-md dark:bg-gray-800 dark:text-gray-200"
                  />
                );
              }

              if (filter.multi) {
                return (
                  <MultiSelect
                    key={String(col.key)}
                    value={(filters[col.key as string] as string[]) || []}
                    options={(filter.options || []).map((opt) => ({
                      label: opt,
                      value: opt,
                    }))}
                    maxSelectedLabels={2}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        [col.key]: e.value,
                      }))
                    }
                    placeholder={`Filter ${col.header}`}
                    display="chip"
                    className="min-w-[12rem]"
                  />
                );
              }
              return (
                <select
                  key={String(col.key)}
                  value={(filters[col.key as string] as string) || ""}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      [col.key]: e.target.value,
                    }))
                  }
                  className="px-3 py-2 text-sm border rounded-md dark:bg-gray-800 dark:text-gray-200"
                >
                  <option value="">All {col.header}</option>
                  {filter.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              );
            })}
        </div>

        <div>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 text-sm border rounded-md dark:bg-gray-800 dark:text-gray-200"
          />
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={String(col.key)}
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  {col.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {paginatedData.map((row) => (
              <TableRow
                key={row.id}
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((col) => (
                  <TableCell
                    key={String(col.key)}
                    className="px-5 py-3 text-gray-700 dark:text-gray-300"
                  >
                    {col.render ? col.render(row) : String(row[col.key] ?? "-")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between px-5 py-3 border-t border-gray-200 dark:border-white/[0.05]">
        <span className="text-sm text-gray-500">
          Page {page} of {totalPages || 1}
        </span>
        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-2 py-1 text-sm border rounded disabled:opacity-50 dark:text-gray-500"
          >
            Prev
          </button>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-2 py-1 text-sm border rounded disabled:opacity-50 dark:text-gray-500"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
