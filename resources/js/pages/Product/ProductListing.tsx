import * as React from "react";
import { Head } from '@inertiajs/react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { usePage } from "@inertiajs/react";
import { BreadcrumbItem } from "@/types";
import AppLayout from "@/layouts/app-layout";
const breadcrumbs: BreadcrumbItem[] = [{
    title: 'Product',
    href: '/product',
}];
interface Product {
  id: number;
  name: string;
  sku: string;
  description: string;
  price: number;
  stock: number;
  category_id: number;
  weight: number;
  width: number;
  length: number;
  height: number;
  fragile: string;
  status: string;
  image: string;
}

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey: "sku",
    header: "SKU",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      return <div className="items-center font-medium text-blue-600">RM{price.toFixed(2)}</div>;
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "fragile",
    header: "Fragile",
    cell: ({ row }) => (
      <span className={`px-2 py-1 rounded-md text-white text-sm ${row.getValue("fragile") === "yes" ? "bg-red-500" : "bg-green-500"}`}>
        {row.getValue("fragile") === "yes" ? "Yes" : "No"}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => alert(`Viewing ${row.original.name}`)}>View Details</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const ProductListing = () => {
  const { products } = usePage<{ products: Product[] }>().props;
  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Product Listing" />
      <div className="w-full bg-white p-5 shadow-md rounded-lg">
        <div className="w-full p-3 flex items-center justify-between font-bold">
            <div className="flex flex-col gap-2">
              <span>Product List</span>
              <span className="flex font-normal text-gray-500 text-xs">Manage your products</span>
            </div>
            <Button 
              className="bg-orange-400 p-5" 
              onClick={() => router.visit("/product")}
            >
              Add Product 
          </Button>
        </div>

        <div className="rounded-lg border bg-white border-gray-200 overflow-hidden">
          <div className="items-start p-3">
            <form className="flex w-[300px] border border-black rounded">
                {/* Input Field */}
                <input
                    type="text"
                    placeholder="Search..."
                    className="flex-1 px-4 py-2 outline-none text-gray-700"
                />
                {/* Search Button */}
                <button
                    type="submit"
                    className="bg-black px-4 flex items-center justify-center"
                      >
                    {/* Search Icon (SVG) */}
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-search"
                    >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" x2="16.65" y1="21" y2="16.65" />
                    </svg>
                </button>
            </form>
          </div>
          <Table>
            <TableHeader className="bg-gray-100">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="border-b border-gray-200">
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="px-4 py-3 font-semibold text-gray-700">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} className="hover:bg-gray-50 transition-all">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-4 py-3 border-b">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center py-6 text-gray-500">
                    No products found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        
        </div>
      </div>
    </AppLayout>
  );
  
};

export default ProductListing;
