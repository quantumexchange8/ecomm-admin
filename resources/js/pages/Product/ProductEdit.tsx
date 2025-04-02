import React from 'react';
import { useForm, router } from '@inertiajs/react'; // ✅ Import `router`
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Category {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
    sku: string;
    price: number;
    stock: number;
    fragile: string;
    category_id: number;
    image: string;
    status: string;
    description: string;
    width:number;
    weight:number;
    length:number;
    height:number;
}

const ProductEdit = ({ product, categorys }: { product: Product, categorys: Category[] }) => {
    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        sku: product.sku,
        price: product.price,
        stock: product.stock,
        fragile: product.fragile,
        category_id: String(product.category_id), // Ensure it's stored as a string
        image: null,
        status: product.status,
        description: product.description,
        width: product.width,
        weight: product.weight,
        length: product.length,
        height: product.height,
    });
    

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('product.update', product.id), {
            onSuccess: () => router.visit(route('product.listing')),
        });
    };
    return (
       <div className='flex w-full p-20'>
             <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow-lg">
            <h1 className="text-2xl font-bold">Edit Product</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Other form fields for name, sku, price, stock, fragile, image */}
                 {/* Name Field */}
                 <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
                    <Input
                        type="text"
                        id="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="mt-1 block w-full"
                    />
                    {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                </div>
                {/* SKU Field */}
                <div className="mb-4">
                    <label htmlFor="sku" className="block text-sm font-medium text-gray-700">SKU</label>
                    <Input
                        type="text"
                        id="sku"
                        value={data.sku}
                        onChange={(e) => setData('sku', e.target.value)}
                        className="mt-1 block w-full"
                    />
                    {errors.sku && <div className="text-red-500 text-sm">{errors.sku}</div>}
                </div>
                 {/* Description Field */}
                 <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <Input
                        type="text"
                        id="description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className="mt-1 block w-full"
                    />
                    {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
                </div>
                 {/* Price Field */}
                 <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                    <Input
                        type="text"
                        id="price"
                        value={data.price}
                        onChange={(e) => setData('price', Number(e.target.value) || 0)} // Convert to number
                        className="mt-1 block w-full"
                    />
                    {errors.price && <div className="text-red-500 text-sm">{errors.price}</div>}
                </div>
                {/* Stock Field */}
                <div className="mb-4">
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
                    <Input
                        type="text"
                        id="stock"
                        value={data.stock}
                        onChange={(e) => setData('stock', Number(e.target.value) || 0)} // Convert to number
                        className="mt-1 block w-full"
                    />
                    {errors.stock && <div className="text-red-500 text-sm">{errors.stock}</div>}
                </div>
                 {/* Fragile Field */}
                <div className="mb-4">
                    <label htmlFor="fragile" className="block text-sm font-medium text-gray-700">Fragile</label>
                    <select
                        id="fragile"
                        value={data.fragile}
                        onChange={(e) => setData('fragile', e.target.value)} 
                        className="mt-1 border rounded p-[6px] block w-full"
                    >
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                    </select>
                    {errors.fragile && <div className="text-red-500 text-sm">{errors.fragile}</div>}
                </div>
                <div className="mb-4">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                        id="status"
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value)} // Store 'Yes' or 'No' as string
                        className="mt-1 border rounded p-[6px] block w-full"
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                    {errors.fragile && <div className="text-red-500 text-sm">{errors.fragile}</div>}
                </div>
                 {/* width Field */}
                 <div className="mb-4">
                    <label htmlFor="width" className="block text-sm font-medium text-gray-700">Width</label>
                    <Input
                        type="text"
                        id="width"
                        value={data.width}
                        onChange={(e) => setData('width', Number(e.target.value) || 0)} // Convert to number
                        className="mt-1 block w-full"
                    />
                    {errors.width && <div className="text-red-500 text-sm">{errors.width}</div>}
                </div>
                 {/* weight Field */}
                 <div className="mb-4">
                    <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight</label>
                    <Input
                        type="text"
                        id="weight"
                        value={data.weight}
                        onChange={(e) => setData('weight', Number(e.target.value) || 0)} // Convert to number
                        className="mt-1 block w-full"
                    />
                    {errors.weight && <div className="text-red-500 text-sm">{errors.weight}</div>}
                </div>
                 {/* length Field */}
                 <div className="mb-4">
                    <label htmlFor="length" className="block text-sm font-medium text-gray-700">Length</label>
                    <Input
                        type="text"
                        id="length"
                        value={data.length}
                        onChange={(e) => setData('length', Number(e.target.value) || 0)} // Convert to number
                        className="mt-1 block w-full"
                    />
                    {errors.length && <div className="text-red-500 text-sm">{errors.length}</div>}
                </div>
                 {/* height Field */}
                 <div className="mb-4">
                    <label htmlFor="height" className="block text-sm font-medium text-gray-700">Height</label>
                    <Input
                        type="text"
                        id="height"
                        value={data.height}
                        onChange={(e) => setData('height', Number(e.target.value) || 0)} // Convert to number
                        className="mt-1 block w-full"
                    />
                    {errors.height && <div className="text-red-500 text-sm">{errors.height}</div>}
                </div>
                <div className="mb-4">
                    <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                        id="category_id"
                        value={data.category_id}
                        onChange={(e) => setData('category_id', e.target.value)}
                        className="mt-1 border rounded p-[6px] block w-full"
                    >
                        {categorys.map((category) => (
                            <option key={category.id} value={category.id.toString()}> {/* ✅ Ensure string value */}
                                {category.name}
                            </option>
                        ))}
                    </select>
                    {errors.category_id && <div className="text-red-500 text-sm">{errors.category_id}</div>}
                </div>
{/* Image Preview */}
{/* <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">Product Image</label>
    {data.image && (
        <img 
            src={data.image} 
            alt="Product" 
            className="w-32 h-32 object-cover rounded mt-2"
        />
    )}
</div> */}

{/* Image Upload */}
{/* <div className="mb-4">
    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Change Image</label>
    <input 
    type="file" 
    id="image" 
    accept="image/*" 
    onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file); // ✅ Now stores file properly
        }
    }}
    className="mt-1 block w-full border border-gray-300 rounded"
/>

    {errors.image && <div className="text-red-500 text-sm">{errors.image}</div>}
</div> */}

                <Button type="submit" disabled={processing} className="mt-4 bg-blue-500 text-white">
                    Save Changes
                </Button>
            </form>
        </div>
       </div>
    );
};

export default ProductEdit;
