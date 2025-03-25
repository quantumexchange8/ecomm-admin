import * as React from "react";
import { useState, useEffect } from "react";
import { Head } from '@inertiajs/react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
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
  fragile: string;
}

const ProductListing = () => {
  const { products } = usePage<{ products: Product[] }>().props;
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    let filtered = products;
    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.sku.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      router.delete(`/deleteProduct/${id}`, {
        onSuccess: () => {
          setFilteredProducts(filteredProducts.filter(product => product.id !== id));
        },
        onError: (errors) => {
          console.error("Error deleting product:", errors);
          alert("Failed to delete product. Please try again.");
        }
      });
    }
  };
  
  const columns: ColumnDef<Product>[] = [
    { accessorKey: "name", header: "Product Name" },
    { accessorKey: "sku", header: "SKU" },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => <div className="text-blue-600">RM{parseFloat(row.getValue("price")).toFixed(2)}</div>,
    },
    { accessorKey: "stock", header: "Stock" },
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
      header: "Actions",
      cell: ({ row }) => (
        <Button className="bg-gray-700 text-white p-2 cursor-pointer" onClick={() => handleDelete(row.original.id)}>
          Delete
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data: filteredProducts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize: 6,
      },
    },
  });

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
    <Head title="Product Listing" />
    <div className="w-full bg-white p-5 rounded-lg">
      <div className="w-full p-3 flex items-center justify-between font-bold">
          <div className="flex flex-col gap-2">
            <span>Product List</span>
            <span className="flex font-normal text-gray-500 text-xs">Manage your products</span>
          </div>
          <Button 
            className="bg-orange-400 p-5 cursor-pointer" 
            onClick={() => router.visit("/product")}
          >
            Add Product 
        </Button>
      </div>

      <div className="rounded-lg bg-white overflow-hidden">
        <div className="items-start p-3">
          <form className="flex w-[300px] border border-black rounded">
              {/* Input Field */}
              <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-md outline-none"
          />

          
          </form>
        </div>
        <div className="w-full overflow-x-auto mt-6">
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
                <TableRow key={row.id}  className="border-b border-gray-200">
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
       {/* Pagination Controls */}
       <div className="flex justify-between items-center p-4">
            <Button className="cursor-pointer" disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>
              Previous
            </Button>
            <span>
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </span>
            <Button className="cursor-pointer" disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
              Next
            </Button>
          </div>
      </div>
    </div>
  </AppLayout>

  );
};

export default ProductListing;
