import AppLayout from "@/layouts/app-layout";
import React, { useState, useEffect } from "react";
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"; 
import { Tag } from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Category',
        href: '/category',
    },
];

export default function Category() {
    const [visible, setVisible] = useState(false);
    const [categorys, setCategorys] = useState<Category[]>([]);
    const closeDialog = () => setVisible(false);

    const { data, setData, post, processing, errors, reset } = useForm<Category>({
        name: '',
        slug: '',
        description: '',
        status: 'active', // Default value to prevent TypeScript error
    });
    
    type Category = {
        name: string;
        slug: string;
        description: string;
        status: string;
        [key: string]: string; 
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get("/index");
            setCategorys(response.data.map((category: Category) => ({
                ...category,
                id: Number(category.id),
            })));
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/category', {
            onSuccess: () => {
                closeDialog();
                reset();
                fetchCategories(); 
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Category" />
            <div className='flex flex-col items-center p-8 gap-5 w-full'>

                {/* Category Table */}
                <div className='w-full p-5 border border-gray-300'>
                    <div className="flex justify-between gap-1">
                        <div className="flex flex-col gap-3 text-vulcan-900 font-bold text-xl">
                            Category  
                            <span className="flex flex-col font-normal text-vulcan-900 text-xs">
                                Fill in the details below to create a new category.
                            </span>
                        </div>
                        <button 
                            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-gradient-to-r from-gray-900 to-gray-600 
                                    text-white text-sm font-semibold shadow-md transition-all hover:from-blue-600 hover:to-blue-500 
                                    active:scale-95"
                            onClick={() => setVisible(true)}>
                            Create
                        </button>
                    </div>

                    <div className="w-full overflow-x-auto mt-6">
                        <Table className="bg-gray-100">
                            <TableCaption>A list of your categories.</TableCaption>
                            <TableHeader className="px-4 py-3">
                                <TableRow className="border-b border-gray-200">
                                    <TableHead className="px-4 py-3 font-semibold text-gray-700">No</TableHead>
                                    <TableHead className="px-4 py-3 font-semibold text-gray-700">Name</TableHead>
                                    <TableHead className="px-4 py-3 font-semibold text-gray-700">Slug</TableHead>
                                    <TableHead className="px-4 py-3 font-semibold text-gray-700">Description</TableHead>
                                    <TableHead className="px-4 py-3 font-semibold text-gray-700">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categorys.length > 0 ? (
                                    categorys.map((category, index) => (
                                        <TableRow key={category.id} className="bg-white">
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{category.name}</TableCell>
                                            <TableCell>{category.slug}</TableCell>
                                            <TableCell>{category.description || "N/A"}</TableCell>
                                            <TableCell>{category.status}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center text-gray-500">
                                            No categories found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                {/* Add Category Modal */}
                <Dialog open={visible} onOpenChange={setVisible}>
                    <DialogContent>
                        <DialogTitle>Add Category</DialogTitle>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-4">
                                {/* Name Field */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                        type="text"
                                        placeholder="Enter name"
                                    />
                                    {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                                </div>

                                {/* Slug Field */}
                                <div>
                                    <label htmlFor="slug" className="block text-sm font-medium text-gray-700">Slug</label>
                                    <Input
                                        id="slug"
                                        name="slug"
                                        value={data.slug}
                                        onChange={(e) => setData("slug", e.target.value)}
                                        type="text"
                                        placeholder="Enter slug"
                                    />
                                    {errors.slug && <p className="mt-2 text-sm text-red-600">{errors.slug}</p>}
                                </div>

                                {/* Description Field - Changed to Larger Textarea */}
                                <div className="col-span-2">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        onChange={(e) => setData("description", e.target.value)}
                                        rows={4}
                                        placeholder="Enter description"
                                        className="w-full p-2 border rounded-md"
                                    />
                                    {errors.description && <p className="mt-2 text-sm text-red-600">{errors.description}</p>}
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 py-3">
                                <button type="button" onClick={closeDialog} className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md">
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded-md" disabled={processing}>
                                    {processing ? "Saving..." : "Submit"}
                                </button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
