import AppLayout from "@/layouts/app-layout";
import { Head, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import { UploadIcon } from '@/components/outline';
import { CheckCircle, ImagePlusIcon, PlusIcon, X, XCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Steps } from 'primereact/steps';
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import axios from 'axios';

type Product  = {
    id: number;
    name: string;
    sku: string;
    description: string;
    price: number | null;
    stock: number | null;
    category_id: number | null;
    weight: number | null;
    width: number | null;
    length: number | null;
    height: number | null;
    fragile: number;
    status: string;
    image: object;
}

type EditProductProps = {
    product: Product;
};

export default function EditProduct({ product }: EditProductProps) {

    const stepItems = [
        { label: 'Basic Information' },
        { label: 'Sales Information' },
        { label: 'Shipping Information' },
    ];

    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [activeStep, setActiveStep] = useState(0);
    const basicRef = useRef<HTMLDivElement>(null);
    const salesRef = useRef<HTMLDivElement>(null);
    const shippingRef = useRef<HTMLDivElement>(null);
    const [getCategory, setGetCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchCategory = async () => {
        try {

            const response = await axios.get('/getCategory');
            
            setGetCategory(response.data);

            const matchedCategory = response.data.find((cat: any) => cat.id === product.category_id);
            if (matchedCategory) {
                setData('category_id', matchedCategory);
            }
            
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    const { data, setData, post, processing, errors } = useForm({
        id: product.id,
        name: product?.name || '',
        description: product?.description || '',
        category_id: null,
        sku: product?.sku || '',
        price: product?.price ?? null,
        stock: product?.stock ?? null,
        weight: product?.weight ?? null,
        width: product?.width ?? null,
        length: product?.length ?? null,
        height: product?.height ?? null,
        fragile: product?.fragile || '',
        status: product?.status || '',
        image: null,
    });

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFiles = Array.from(event.target.files);
            if (imageFiles.length + selectedFiles.length > 9) {
                alert("You can only upload a maximum of 9 images.");
                return;
            }
            setImageFiles((prev) => [...prev, ...selectedFiles]);
        }
    };

    const handleRemoveImage = (index: number) => {
        setImageFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleStepChange = (index: number) => {
        setActiveStep(index);
        const targetRef = index === 0 ? basicRef : index === 1 ? salesRef : shippingRef;
        targetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.8, // Trigger when 60% of section is visible
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (entry.target === basicRef.current) {
                        setActiveStep(0);
                    } else if (entry.target === salesRef.current) {
                        setActiveStep(1);
                    } else if (entry.target === shippingRef.current) {
                        setActiveStep(2);
                    }
                }
            });
        }, options);

        if (basicRef.current) observer.observe(basicRef.current);
        if (salesRef.current) observer.observe(salesRef.current);
        if (shippingRef.current) observer.observe(shippingRef.current);

        return () => {
            if (basicRef.current) observer.unobserve(basicRef.current);
            if (salesRef.current) observer.unobserve(salesRef.current);
            if (shippingRef.current) observer.unobserve(shippingRef.current);
        };
    }, []);

    const save: FormEventHandler = (e) => {
        e.preventDefault();
        post('/update-product');
    }

    return (
        <AppLayout>
            <Head />

            <div className='flex flex-col w-full items-center gap-4 px-4 max-h-[90vh] overflow-y-auto'>
                {/* step */}
                <div className="flex w-full items-center justify-center sticky top-0 bg-white z-10 pt-4">
                    <Steps model={stepItems} activeIndex={activeStep} onSelect={(e) => handleStepChange(e.index)} readOnly={false} />
                </div>

                {/* Basic Information */}
                <div ref={basicRef} className="flex flex-col gap-4 w-full border border-gray-300 rounded-sm p-5">
                    <div className="text-xl font-bold bg-white">Basic Information</div>
                    <div className="flex flex-col gap-2 ">
                        <div className="font-medium text-gray-700">Product Images</div>
                        <div className="flex flex-col items-center justify-center border border-dashed border-gray-400 p-6 rounded-lg shadow-sm bg-gray-50 w-full cursor-pointer"
                            onClick={() => document.getElementById('fileInput')?.click()}
                        >
                            {
                                imageFiles.length > 0 ? (
                                    <div className="flex flex-wrap justify-center md:items-center gap-2">
                                        {
                                            imageFiles.map((file, index) => (
                                                <div key={index} className="relative w-24 h-24">
                                                    <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover rounded-md" />
                                                    <Button
                                                        type="button"
                                                        onClick={() => handleRemoveImage(index)}
                                                        className="absolute top-0 right-0"
                                                        variant='secondary'
                                                    >
                                                        <X size={14} />
                                                    </Button>
                                                </div>
                                            ))
                                        }
                                        {
                                            imageFiles.length < 8 && (
                                            <div className='w-24 h-24 border border-dashed border-gray-400 rounded-xl flex flex-col items-center justify-center gap-1.5'>
                                                <ImagePlusIcon />
                                                <div className="text-xs text-gray-800 flex flex-col items-center">
                                                    <span>Add Image</span> 
                                                    <span className="font-bold">({imageFiles.length}/9)</span>
                                                </div>
                                            </div>
                                            )
                                        }
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center cursor-pointer">
                                        <UploadIcon />
                                        <span className="text-gray-500">Drag your files here or click in this area.</span>
                                    </div>
                                )
                            }
                            <input
                              id="fileInput"
                              type="file"
                              accept="image/*"
                              multiple
                              className="hidden"
                              onChange={handleUpload}
                            />
                        </div>
                        <div className="text-sm text-gray-500 mt-2">You can upload up to 9 images.</div>
                    </div>

                    {/* product description */}
                    <div className="flex flex-col gap-4 ">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="name">Product Name</Label>
                            <Input
                                type="text"
                                id="name"
                                value={data.name}
                                className="border border-gray-300 rounded-md p-2"
                                placeholder="Product Name"
                                onChange={(e) => setData('name', e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="category">Product Category</Label>
                            <Dropdown 
                                value={data.category_id} 
                                onChange={(e) => setData('category_id', e.value)} 
                                options={getCategory} 
                                optionLabel="name" 
                                placeholder="Select a City"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="description">Product Description</Label>
                            <Textarea 
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Type your message here."
                            />
                        </div>
                    </div>

                    
                </div>

                {/* Sales Information */}
                <div ref={salesRef} className="flex flex-col gap-4 w-full border border-gray-300 rounded-sm p-5">
                    <div className="text-xl font-bold bg-white">Sales Information</div>
                    {/* Sales Information */}
                    <div className="flex flex-col gap-4 ">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="price">Product Price</Label>
                            <InputNumber 
                                inputId="price"
                                value={data.price} 
                                onValueChange={(e) => setData('price', e.value ?? null)} 
                                mode="currency" 
                                currency="MYR" 
                                locale="en-MY"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="stock">Stocks</Label>
                            <InputNumber 
                                inputId="stock"
                                value={data.stock} 
                                onValueChange={(e) => setData('stock', e.value ?? null)}
                                suffix=" qty"
                            />
                        </div>
                    </div>
                </div>

                {/* Shipping Information */}
                <div ref={shippingRef} className="flex flex-col gap-4 w-full border border-gray-300 rounded-sm p-5">
                    <div className="text-xl font-bold bg-white">Shipping Information</div>
                    <div className="flex flex-col gap-4 ">
                        <div className="flex items-center gap-4">
                            <div className="min-w-40">
                                <Label htmlFor="weight">Product Weight</Label>
                            </div>
                            <InputNumber 
                                inputId="weight"
                                value={data.weight} 
                                onValueChange={(e) => setData('weight', e.value ?? null)}
                                suffix=" kg"
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="min-w-40">
                                <Label >Parcel Size</Label>
                            </div>
                            <div className="flex items-center gap-4">
                                <div>
                                    <InputNumber 
                                        inputId="width"
                                        value={data.width} 
                                        onValueChange={(e) => setData('width', e.value ?? null)}
                                        suffix=" cm"
                                        placeholder="Width"
                                    />
                                </div>
                                <div>X</div>
                                <div>
                                    <InputNumber 
                                        inputId="length"
                                        value={data.length} 
                                        onValueChange={(e) => setData('length', e.value ?? null)}
                                        suffix=" cm"
                                        placeholder="Length"
                                    />
                                </div>
                                <div>X</div>
                                <div>
                                    <InputNumber 
                                        inputId="height"
                                        value={data.height} 
                                        onValueChange={(e) => setData('height', e.value ?? null)}
                                        suffix=" cm"
                                        placeholder="Height"
                                    />
                                </div>
                            </div>
                            
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="min-w-40">
                                <Label >Fragile</Label>
                            </div>
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
                    </div>
                </div>

                {/* Save button */}
                <div className="flex justify-end gap-4 w-full border border-gray-300 rounded-sm p-5 sticky bottom-0 bg-white">
                    <Button variant='ghost' size='lg'>Cancel</Button>
                    <Button size='lg' onClick={save} disabled={processing} >Save</Button>
                </div>
            </div>
        </AppLayout>
    )
}