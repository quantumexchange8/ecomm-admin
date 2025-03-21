import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import React, { useState, useEffect} from "react";
import { X, Plus, XCircle, CheckCircle } from "lucide-react";
import axios, { AxiosError } from "axios";
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import { FileUpload } from "primereact/fileupload";
import { InputTextarea } from "primereact/inputtextarea";

const breadcrumbs: BreadcrumbItem[] = [{
    title: 'Product',
    href: '/product',
}];

export default function Product() {

  const [imageFile, setImageFile] = useState<File | null>(null);
    const [images, setImages] = useState<string[]>([]); 
    const [categorys, setCategorys] = useState<{ id: number; name: string }[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

    const fetchCategories = async () => {
        try {
            const response = await axios.get("/getCategory");
            console.log("Fetched categories:", response.data); 

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
  

    const { data, setData, post, processing, errors, reset } = useForm({
      name: '',
      description: '',
      category_id: '',
      sku: '',
      price: '',
      stock: '',
      weight: '',
      width: '',
      length: '',
      height: '',
      fragile: '',
      status: '',
      image: '',
  });


  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
    }
  };

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    
    // Append form fields  
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key as keyof typeof data] as string);
    });
  
    // Append Image  
    if (imageFile) {
      formData.append("image", imageFile);
    }
  
    router.post('/store-product', formData, {
      onSuccess: () => {
        reset();
        setImageFile(null);
        fetchCategories();
      },
      onError: (errors) => {
        console.error("Form submission error:", errors);
      },
    });
  };
  

  // console.log(categorys)
  

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product" />
            <div className='flex flex-col w-full items-center gap-4 p-10'>
                <div className="flex w-full justify-end">
                  <Button
                    className="bg-orange-400 p-5" 
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

  <div
    className="flex flex-col items-center justify-center border border-dashed border-gray-400 p-6 rounded-lg shadow-sm bg-gray-50 w-full h-40 cursor-pointer"
    onClick={() => document.getElementById('fileInput')?.click()} // Clickable area
  >
    {/* Image Preview */}
    {imageFile ? (
      <img
        src={URL.createObjectURL(imageFile)}
        alt="Uploaded Preview"
        className="w-full h-full object-contain rounded-md"
      />
    ) : (
      <label className="flex flex-col items-center cursor-pointer">
        <svg
          className="w-10 h-10 text-gray-400 mb-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l4-4 4 4m-4-4v12"></path>
        </svg>
        <p className="text-gray-500">Drag your files here or click in this area.</p>
      </label>
    )}

    {/* Hidden File Input */}
    <input
      id="fileInput"
      type="file"
      accept="image/*"
      className="hidden"
      onChange={handleUpload}
    />
  </div>
</div>


                    <label className="flex flex-col font-medium mb-2">Product Name <span className="text-red-500">*</span></label>
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

                    <label className="flex flex-col font-medium mb-2">Category</label>
                    <select 
                        value={data.category_id || ''} 
                        onChange={(e) => setData('category_id', e.target.value)} 
                        className="w-full border px-3 py-2 rounded-md mb-4"
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
                        onChange={(e) => setData('price', e.target.value)}
                        className="w-full border px-3 py-2 rounded-md mb-4" 
                        placeholder="Enter product price" 
                      />
                    <label className="flex flex-col font-medium mb-2">Stock</label>
                    <input
                        type="text"
                        value={data.stock} 
                        onChange={(e) => setData('stock', e.target.value)}
                        className="w-full border px-3 py-2 rounded-md mb-4" 
                        placeholder="Enter product stock" 
                      />
                </div>

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
                          onChange={(e) => setData('weight', e.target.value)}
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
                          onChange={(e) => setData('width', e.target.value)}
                        
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
                          onChange={(e) => setData('length', e.target.value)}
                        
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
                          onChange={(e) => setData('height', e.target.value)}
                          
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
                        className="w-full border px-3 py-2 rounded-md mb-4"
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                  </select>         
                </div>
                <button onClick={handleSubmit} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md">Submit</button>
            </div>
        </AppLayout>
    );
}
