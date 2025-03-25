import AppLayout from "@/layouts/app-layout";
import React, { useState, useEffect } from "react";
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import axios from 'axios'; // Ensure axios is imported
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
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
        parent_id: '',
        level: '1',
        description: '',
        status: 'active',
    });
    type Category = {
        name: string;
        slug: string;
        parent_id: string;
        level: string;
        description: string;
        status: string;
        [key: string]: string; 
    };
  
    const fetchCategories = async () => {
        try {
            const response = await axios.get("/index");
            setCategorys(response.data.map((category: Category) => ({
                ...category,
                id: Number(category.id),  // Ensure id is a number
                parent_id: category.parent_id ? String(category.parent_id) : null, // Convert to string if necessary
            })));
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };
    
    useEffect(() => {
        fetchCategories();
    }, []);

    const categoryCounts = categorys.reduce((acc, category) => {
        acc[category.name] = (acc[category.name] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const uniqueCategories = Object.keys(categoryCounts).map(name => ({
        name,
        count: categoryCounts[name]
    }));

    const toggleStatus = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
        try {
            await axios.put(`/update`, { id, status: newStatus });
    
            setCategorys((prevCategories) =>
                prevCategories.map((category) =>
                    Number(category.id) === id ? { ...category, status: newStatus } : category
                )
            );
            console.log(`Updated category ${id} to ${newStatus}`);
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const gradientColors = [
        "from-orange-400 to-orange-200",
        "from-blue-500 to-blue-300",
        "from-green-500 to-green-300",
        "from-pink-500 to-pink-300",
        "from-purple-500 to-purple-300"
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/category', {
            onSuccess: () => {
                closeDialog();
                reset();
                fetchCategories(); // Refresh categories after submission
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Category" />
            <div className='flex flex-col items-center p-10 w-full'>

                {/* Category Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full p-6">
                    {uniqueCategories.map((category, index) => (
                        <div 
                            key={index} 
                            className={`p-6 rounded-xl shadow-md bg-gradient-to-r ${gradientColors[index % gradientColors.length]} 
                                text-white flex items-center gap-4 transition-transform transform hover:scale-105`} >
                            <div className="bg-white bg-opacity-20 p-3 rounded-full">
                                <Tag size={30} className="text-white" />
                            </div>
                            <div>
                                <p className="text-xl font-semibold">{category.name}</p>
                            </div>
                        </div>
                    ))}
                </div>

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
                        <Table className="w-full border bg-gray-900 border-gray-900">
                            <TableCaption>A list of your categories.</TableCaption>
                            <TableHeader>
                                <TableRow className="text-white">
                                    <TableHead>No</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>SLUG</TableHead>
                                    <TableHead>Parent ID</TableHead>
                                    <TableHead>Level</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categorys.length > 0 ? (
                                categorys.map((category, index) => (
                                <TableRow key={category.id} className="bg-white">
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell>{category.slug}</TableCell>
                                    <TableCell>{category.parent_id || "None"}</TableCell>
                                    <TableCell>{category.level}</TableCell>
                                    <TableCell>{category.description || "N/A"}</TableCell>
                                    <TableCell>
                                        <div className={`relative w-12 h-6 flex items-center rounded-full p-1 transition-all duration-300 ease-in-out cursor-pointer ${
                                            category.status === "active" ? "bg-[#00bcd4]" : "bg-gray-300"
                                            }`}
                                            onClick={() => toggleStatus(Number(category.id), category.status)} >
                                            <div
                                                className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-all duration-300 ease-in-out ${
                                                    category.status === "active" ? "translate-x-6" : "translate-x-0"
                                                }`}>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center text-white">
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
                                {Object.keys(data).map((key) => (
                                    <div key={key}>
                                        <label htmlFor={key} className="block text-sm font-medium text-gray-700">{key}</label>
                                        <Input
                                            id={key}
                                            name={key}
                                            onChange={(e) => setData((prev) => ({
                                                ...prev,
                                                [key]: e.target.value
                                            }))}
                                            type="text"
                                            placeholder={`Enter ${key}`}
                                        />
                                        {errors[key as keyof Category] && <p className="mt-2 text-sm text-red-600">{errors[key as keyof Category]}</p>}
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-end gap-2 py-3">
                                <button type="button" onClick={closeDialog} className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md">Cancel</button>
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
