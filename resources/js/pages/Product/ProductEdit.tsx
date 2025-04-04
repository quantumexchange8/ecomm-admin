import { useForm, router, Head } from '@inertiajs/react'; 
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { FormEventHandler, useEffect, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { X, Plus, XCircle, CheckCircle } from "lucide-react";
import axios, { AxiosError } from "axios";
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [{
    title: 'Product',
    href: '/product',
}];
interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  stock: number;
  fragile: string;
  category_id: number;
  image: string;
  images?: string[];
  status: string;
  description: string;
  width:number;
  weight:number;
  length:number;
  height:number;
}

export default function ProductEdit({ product }: { product: Product }) {

    console.log('product ', product)

    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [images, setImages] = useState<string[]>([]);
    const [categorys, setCategorys] = useState<{ id: number; name: string }[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
   

    const fetchCategories = async () => {
        try {
            const response = await axios.get("/getCategory");
    
            setCategorys(response.data);
            
            // if (Array.isArray(response.data)) {  
            //     setCategorys(response.data);
            //     if (response.data.length > 0) setSelectedCategory(response.data[0].id);
            // } else {
            //     console.error("Invalid category response:", response.data);
            // }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
      };
    
      useEffect(() => {
        fetchCategories();
      }, []);


    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        sku: product.sku,
        price: product.price,
        stock: product.stock,
        fragile: product.fragile,
        category_id: String(product.category_id), // Ensure it's stored as a string
        image: product.image, 
        status: product.status,
        description: product.description,
        width: product.width,
        weight: product.weight,
        length: product.length,
        height: product.height,
    });

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) return;
  
      const selectedFiles = Array.from(files);
      if (imageFiles.length + selectedFiles.length > 9) {
          alert("You can only upload a maximum of 9 images.");
          return;
      }
  
      setImageFiles((prev) => [...prev, ...selectedFiles]);
  };
  

  const handleRemoveImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
};

const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault(); 


        
        //   const formData = new FormData();
        //   Object.keys(data).forEach((key) => {
        //       formData.append(key, data[key as keyof typeof data] as string);
        //   });
    
        //   imageFiles.forEach((file, index) => {
        //       formData.append(`images[${index}]`, file);
        //   });
    
        //   router.post('/store-product', formData, {
        //       onSuccess: () => {
        //           reset();
        //           setImageFiles([]);
        //           fetchCategories();
        //       },
        //       onError: (errors) => {
        //           console.error("Form submission error:", errors);
        //       },
        //   });
      };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product" />

            <div className='flex flex-col w-full items-center gap-4 p-10'>
                <div className="flex w-full justify-end">
                  <Button
                    className="bg-orange-400 p-5 cursor-pointer" 
                    onClick={() => router.visit("/product-listing")}
                  >
                    Back to Product
                  </Button>
                </div>
                <div className="flex flex-col w-full border border-gray-300 rounded-s-sm p-5">
                    <h2 className="text-xl font-bold mb-4 bg-white">Basic Information</h2>
                    {/* Product Images */}
                    <div className="mb-6">
                      <label className="flex font-medium mb-2 text-gray-700">
                        Product Images <span className="text-red-500">*</span>
                      </label>
                      <div className="flex flex-col items-center justify-center border border-dashed border-gray-400 p-6 rounded-lg shadow-sm bg-gray-50 w-full h-40 cursor-pointer"
                        onClick={() => document.getElementById('fileInput')?.click()}>
                        {/* Image Preview */}
                        {imageFiles.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                              {imageFiles.map((file, index) => (
                                <div key={index} className="relative w-24 h-24">
                                  <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover rounded-md" />
                                  <button
                                      type="button"
                                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                      onClick={() => handleRemoveImage(index)}>
                                        <X size={14} />
                                  </button>
                                </div>
                              ))}
                          </div>
                            ) : (
                            <label className="flex flex-col items-center cursor-pointer">
                                <svg
                                    className="w-10 h-10 text-gray-400 mb-2"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l4-4 4 4m-4-4v12"></path>
                                </svg>
                                <p className="text-gray-500">Drag your files here or click in this area.</p>
                            </label>
                            )}
                            <input
                              id="fileInput"
                              type="file"
                              accept="image/*"
                              multiple
                              className="hidden"
                              onChange={handleUpload}
                            />
                      </div>
                        <p className="text-sm text-gray-500 mt-2">You can upload up to 9 images.</p>
                    </div>
                    {/* Form */}
                    <label className="flex font-medium mb-2">Product Name <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        value={data.name} 
                        onChange={(e) => setData('name', e.target.value)}
                        className="w-full border px-3 py-2 rounded-md mb-4" 
                        placeholder="Enter product name" 
                      />
                    <label className="flex flex-col font-medium mb-2">Description</label>
                      <textarea
                          value={data.description}
                          onChange={(e) => setData('description', e.target.value)}
                          className="w-full border px-3 py-2 rounded-md mb-4 h-32 resize-none"
                          placeholder="Enter product description"
                      />

                      <div className="flex w-full justify-between mb-4">
                        <label className="flex flex-co items-center font-medium">Category</label>
                   
                        <Button
                          className="bg-orange-400 p-5 justify-end gap-2 cursor-pointer" 
                          onClick={() => router.visit("/category")}
                        >
                        Add Category
                        </Button>
                      </div>
                    <select 
                        value={data.category_id || ''} 
                        onChange={(e) => setData('category_id', e.target.value)} 
                        className="w-full border px-3 py-2 rounded-md"
                      >
                        <option value="" disabled>Select a category</option>
                        {categorys.length > 0 ? categorys.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        )) : <option disabled>Loading categories...</option>}
                    </select>
                    <label className="flex flex-col font-medium mb-2">Sku</label>
                    <input
                        type="text"
                        value={data.sku} 
                        onChange={(e) => setData('sku', e.target.value)}
                        className="w-full border px-3 py-2 rounded-md mb-4" 
                        placeholder="Enter product sku" 
                      />
                    <label className="flex flex-col font-medium mb-2">Price</label>
                    <input
                        type="text"
                        value={data.price} 
                        onChange={(e) => setData('price', Number(e.target.value))}
                        className="w-full border px-3 py-2 rounded-md mb-4" 
                        placeholder="Enter product price" 
                      />
                    <label className="flex flex-col font-medium mb-2">Stock</label>
                    <input
                        type="text"
                        value={data.stock} 
                        onChange={(e) => setData('stock', Number(e.target.value))}
                        className="w-full border px-3 py-2 rounded-md mb-4" 
                        placeholder="Enter product stock" 
                      />
                </div>
                  {/* Shipping */}
                <div className="flex flex-col w-full gap-4 border border-gray-300 rounded-s-sm p-5">
                  <h2 className="text-xl font-bold mb-4 bg-white">Shipping</h2>
                  <div className="flex flex-col gap-4">
                    {/* Weight Section */}
                    <div className="flex items-center gap-2">
                      <label className="text-black font-medium w-24">Weight</label>
                      <div className="flex items-center border rounded-md px-2 py-1">
                        <input 
                          type="number" 
                          value={data.weight} 
                          onChange={(e) => setData('weight', Number(e.target.value))}
                          placeholder="Weight" 
                          className="w-20 text-center outline-none" 
                        />
                        <span className="text-gray-500 px-2">kg</span>
                      </div>
                    </div>

                    {/* Parcel Size Section */}
                    <div className="flex items-center gap-2">
                      <label className="text-black font-medium w-24">Parcel Size</label>
                      {/* Width */}
                      <div className="flex items-center border rounded-md px-2 py-1">
                        <input
                          type="number"
                          value={data.width}
                          onChange={(e) => setData('width', Number(e.target.value))}

                        
                          placeholder="Enter product width"
                        />
                          <span className="text-gray-500 px-2">cm</span>
                      </div>
                      <span className="text-gray-500">×</span>
                      {/* Length */}
                      <div className="flex items-center border rounded-md px-2 py-1">
                        <input
                          type="number"
                          value={data.length}
                          onChange={(e) => setData('length', Number(e.target.value))}

                          placeholder="Enter product length"
                          />
                          <span className="text-gray-500 px-2">cm</span>
                      </div>
                      <span className="text-gray-500">×</span>
                      {/* Height */}
                      <div className="flex items-center border rounded-md px-2 py-1">
                        <input
                          type="number"
                          value={data.height}
                          onChange={(e) => setData('height', Number(e.target.value))}

                          placeholder="Enter product height"
                          />
                          <span className="text-gray-500 px-2">cm</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {/* Fragile Label */}
                    <label className="flex font-medium mb-2">Fragile?</label>
                    <div className="flex gap-4">
                      <label className={`flex items-center gap-2 px-5 py-2 rounded-full cursor-pointer border
                          ${data.fragile === "yes" ? "bg-red-500 text-white border-red-500" : "bg-white border-gray-300 hover:bg-red-100"}`}>
                          <input type="radio" value="yes" checked={data.fragile === "yes"}
                              onChange={(e) => setData("fragile", e.target.value)} className="hidden" />
                          <XCircle className={`w-5 h-5 ${data.fragile === "yes" ? "text-white" : "text-red-500"}`} />
                          <span>Yes</span>
                      </label>
                      <label className={`flex items-center gap-2 px-5 py-2 rounded-full cursor-pointer border
                          ${data.fragile === "no" ? "bg-green-500 text-white border-green-500" : "bg-white border-gray-300 hover:bg-green-100"}`}>
                          <input type="radio" value="no" checked={data.fragile === "no"}
                              onChange={(e) => setData("fragile", e.target.value)} className="hidden" />
                          <CheckCircle className={`w-5 h-5 ${data.fragile === "no" ? "text-white" : "text-green-500"}`} />
                          <span>No</span>
                      </label>
                    </div>
                  </div>
                 {/* Status */}
                  <label className="flex font-medium mb-2">Status</label>
                  <select 
                        value={data.status} 
                        onChange={(e) => setData('status', e.target.value)} 
                        className="w-full border px-3 py-2 rounded-md mb-4">
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                  </select>         
                </div>
                <button onClick={handleSubmit} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md">Submit</button>
            </div>
        </AppLayout>
    )
}

