import * as React from "react";
import { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { FiMoreHorizontal } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { router, usePage } from "@inertiajs/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AppLayout from "@/layouts/app-layout";

interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: string;
}

const Member = () => {
  const { users } = usePage<{ users: User[] }>().props;
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    let filtered = users.filter(user => user.role !== "admin"); 
    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const columns: ColumnDef<User>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone", header: "Phone", cell: ({ row }) => row.getValue("phone") || "N/A" },
    { accessorKey: "role", header: "Role" },
    {
      header: "Actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-2">
              <FiMoreHorizontal size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleDelete(row.original.id)} className="text-red-500">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this member?")) {
      router.delete(`/deleteMember/${id}`, {
        onSuccess: () => {
          setFilteredUsers(filteredUsers.filter(user => user.id !== id));
        },
        onError: (errors) => {
          console.error("Error deleting member:", errors);
          alert("Failed to delete member. Please try again.");
        }
      });
    }
  };

  const table = useReactTable({
    data: filteredUsers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: { pagination: { pageSize: 6 } },
  });

  return (
    <AppLayout>
      <Head title="Member List" />
      <div className="w-full bg-white p-5 rounded-lg">
        <div className="w-full p-3 flex items-center justify-between font-bold">
          <div className="flex flex-col gap-2">
            <span>Member List</span>
            <span className="flex font-normal text-gray-500 text-xs">Manage your members</span>
          </div>
        </div>

        <div className="items-start p-3">
          <form className="flex w-[300px] border border-black rounded">
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
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} className="border-b border-gray-200">
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
                    No members found.
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
    </AppLayout>
  );
};

export default Member;
