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
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rowClickCallback?: (row?: TData) => void;
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
          data-id={row.id}
          className="cursor-pointer"
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
  rowClickCallback
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const callRowClickCallback = (rowId: string | null | undefined) => {
    if (rowId) {
      try {
        const row = table.getRow(rowId);
        const original = row.original;

        rowClickCallback?.(original);
      } catch {
        rowClickCallback?.(undefined);
      }
    }
  }; 

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableBody onClick={(event) => {
            const target = (event.target as HTMLElement).closest("tr");
            const id = target?.getAttribute("data-id");

            callRowClickCallback(id);
          }
        }>
            <DataTableRows 
              rows={table.getRowModel().rows} 
              columsSpan={columns.length}
            />
        </TableBody>
      </Table>
    </div>
  );
};