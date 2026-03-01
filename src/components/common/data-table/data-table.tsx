"use client";

import { JSX, memo } from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
};

interface DataTableRowsProps<TData> {
    columsSpan: number;
    rows?: Row<TData>[];
};

interface DataTableRowProps<TData> {
    row: Row<TData>;
};

const DataTableRow = memo(function<TData>({ row }: DataTableRowProps<TData>) {
    return (
        <TableRow
            key={row.id}
            data-state={row.getIsSelected() && "selected"}
        >
            {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
            ))}
        </TableRow>
    );
}) as <TData>(props: DataTableRowProps<TData>) => JSX.Element;

function DataTableRows<TData>({ rows, columsSpan }: DataTableRowsProps<TData>) {
    if (!rows || !rows.length) {
        return (
            <TableRow>
              <TableCell colSpan={columsSpan} className="h-24 text-center text-muted-foreground">
                No results.
              </TableCell>
            </TableRow>
        );
    }

    return (
        rows.map((row) => <DataTableRow row={row} key={row.id}/>)
    );
};

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
            <DataTableRows rows={table.getRowModel().rows} columsSpan={columns.length}/>
        </TableBody>
      </Table>
    </div>
  );
};