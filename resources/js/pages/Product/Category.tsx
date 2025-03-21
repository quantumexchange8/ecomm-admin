import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useForm } from "@inertiajs/react";
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Category',
        href: '/category',
    },
];

export default function Category() {

    const { data, setData, post, processing, errors, reset, progress } = useForm({
        name: '',
        slug: '',
        parent_id: '',
        level: '',
        description: '',
        status:'',
    
    });
    
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Category" />
        {/* <div className='flex flex-col items-center max-w-[800px] mt-6'>
            <div className='flex flex-col p-5 border border-gray-300'>
            <div className="flex flex-col gap-1">
            <div className="flex flex-col text-vulcan-900 font-bold text-xl">
              Category  
            </div>
            <div className="flex flex-col text-vulcan-900 text-xs">
            Fill in the details below to create a new category.
            </div>
          </div>

            <div className='w-full grid grid-cols-2 grid-rows-2 items-start gap-4 '>
                <div className='w-full flex gap-1'>
                <div className="text-vulcan-900 text-xs font-medium flex-col items-start w-full">
                <div className="flex items-center gap-1">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                    </label>
                <span className="text-error-800">*</span>
            </div>

                <input
                    id="name"
                    name="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    type="text"
                    placeholder="e.g. Tan Mei Mei"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />

                {errors.name && (
                <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                )}

                </div>
        </div>
            </div>
         
        </div>
            </div> */}
       
    </AppLayout>
  );
}

