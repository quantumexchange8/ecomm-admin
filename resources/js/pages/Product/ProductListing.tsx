import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import { FiMoreHorizontal } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePage } from "@inertiajs/react";
import { BreadcrumbItem } from "@/types";
import AppLayout from "@/layouts/app-layout";
import { Paginator } from "primereact/paginator"; // Import PrimeReact Paginator

const breadcrumbs: BreadcrumbItem[] = [{ title: "Product", href: "/product" }];

interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  stock: number;
  fragile: string;
  category: string;
  image: string;
}

const ProductListing = () => {
  const { products } = usePage<{ products: Product[] }>().props;
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Pagination state with PrimeReact's design
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);

  useEffect(() => {
    setFilteredProducts(
      products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.sku.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFirst(0); 
  }, [searchTerm, products]);

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      router.delete(`/deleteProduct/${id}`, {
        onSuccess: () => {
          setFilteredProducts(filteredProducts.filter((product) => product.id !== id));
        },
        onError: (errors) => {
          console.error("Error deleting product:", errors);
          alert("Failed to delete product. Please try again.");
        },
      });
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Product Listing" />
      <div className="w-full bg-white p-5 rounded-lg">
        <div className="w-full p-3 flex items-center justify-between font-bold">
          <div className="flex flex-col gap-2">
            <span>Product List</span>
            <span className="flex font-normal text-gray-500 text-xs">
              Manage your products
            </span>
          </div>
          <Button className="bg-orange-400 p-5 cursor-pointer" onClick={() => router.visit("/product")}>
            Add Product
          </Button>
        </div>
        <div className="rounded-lg bg-white overflow-hidden">
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
                <TableRow className="border-b border-gray-200">
                  <TableHead className="px-4 py-3 font-semibold text-gray-700">Product Name</TableHead>
                  <TableHead className="px-4 py-3 font-semibold text-gray-700">SKU</TableHead>
                  <TableHead className="px-4 py-3 font-semibold text-gray-700">Price</TableHead>
                  <TableHead className="px-4 py-3 font-semibold text-gray-700">Stock</TableHead>
                  <TableHead className="px-4 py-3 font-semibold text-gray-700">Fragile</TableHead>
                  <TableHead className="px-4 py-3 font-semibold text-gray-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length ? (
                  filteredProducts.slice(first, first + rows).map((product) => (
                    <TableRow key={product.id} className="border-b border-gray-200">
                      <TableCell className="px-4 py-3">{product.name}</TableCell>
                      <TableCell className="px-4 py-3">{product.sku}</TableCell>
                      <TableCell className="px-4 py-3 text-blue-600">RM{product.price.toFixed(2)}</TableCell>
                      <TableCell className="px-4 py-3">{product.stock}</TableCell>
                      <TableCell className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-md text-white text-sm ${
                            product.fragile === "yes" ? "bg-red-500" : "bg-green-500"
                          }`}
                        >
                          {product.fragile === "yes" ? "Yes" : "No"}
                        </span>
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="p-2">
                              <FiMoreHorizontal size={20} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => router.visit(`/edit-product/${product.id}`)}>
                              Edit
                          </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(product.id)} className="text-red-500">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                      No products found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 mt-6 border border-gray-200">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold">{first + 1}</span> to{" "}
              <span className="font-semibold">{Math.min(first + rows, filteredProducts.length)}</span> of{" "}
              <span className="font-semibold">{filteredProducts.length}</span> products
            </p>

            <Paginator
              first={first}
              rows={rows}
              totalRecords={filteredProducts.length}
              rowsPerPageOptions={[10, 20, 30]}
              onPageChange={(event) => {
                setFirst(event.first);
                setRows(event.rows);
              }}
              template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
              className="flex items-center gap-2"
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProductListing;
