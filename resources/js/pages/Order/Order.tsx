import React, { useState } from "react";
import { FaCog } from "react-icons/fa";
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
interface Order {
  id: number;
  name: string;
  address: string;
  date: string;
  price: string;
  status: "Pending" | "Dispatch" | "Completed";
  avatar: string;
}
const breadcrumbs: BreadcrumbItem[] = [{
    title: 'Product',
    href: '/product',
}];

const orders: Order[] = [
  { id: 2632, name: "Brooklyn Zoe", address: "302 Snider Street, RUTLAND, VT, 05701", date: "31 Jul 2020", price: "$64.00", status: "Pending", avatar: "https://i.pravatar.cc/40?img=1" },
  { id: 2633, name: "John McCormick", address: "1096 Wiseman Street, CALMAR, IA, 52132", date: "01 Aug 2020", price: "$35.00", status: "Dispatch", avatar: "https://i.pravatar.cc/40?img=2" },
  { id: 2634, name: "Sandra Pugh", address: "1640 Thorn Street, SALE CITY, GA, 98106", date: "02 Aug 2020", price: "$74.00", status: "Completed", avatar: "https://i.pravatar.cc/40?img=3" },
  { id: 2635, name: "Vernie Hart", address: "3898 Oak Drive, DOVER, DE, 19906", date: "02 Aug 2020", price: "$82.00", status: "Pending", avatar: "https://i.pravatar.cc/40?img=4" },
  { id: 2636, name: "Mark Clark", address: "1915 Augusta Park, NASSAU, NY, 12062", date: "03 Aug 2020", price: "$39.00", status: "Dispatch", avatar: "https://i.pravatar.cc/40?img=5" },
  { id: 2637, name: "Rebekah Foster", address: "3445 Park Boulevard, BIOLA, CA, 93606", date: "03 Aug 2020", price: "$67.00", status: "Pending", avatar: "https://i.pravatar.cc/40?img=6" },
];

const Order: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);

  return (
      <AppLayout breadcrumbs={breadcrumbs}>
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-2">Order</h2>
      <p className="text-gray-600 mb-4">28 orders found</p>
      
      <div className="flex space-x-6 border-b pb-3">
        {['All orders', 'Dispatch', 'Pending', 'Completed'].map((tab, index) => (
          <button key={index} className={`text-lg font-medium ${index === 0 ? 'text-black border-b-2 border-black' : 'text-gray-400'}`}>{tab}</button>
        ))}
      </div>

      <div className="mt-4 bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm">
            <tr>
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Address</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} 
                className={`border-b ${selectedOrder === order.id ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
                onClick={() => setSelectedOrder(order.id)}>
                <td className="py-3 px-4">#{order.id}</td>
                <td className="py-3 px-4 flex items-center space-x-2">
                  <img src={order.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
                  <span>{order.name}</span>
                </td>
                <td className="py-3 px-4">{order.address}</td>
                <td className="py-3 px-4">{order.date}</td>
                <td className="py-3 px-4">{order.price}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === 'Pending' ? 'bg-red-100 text-red-600' : order.status === 'Dispatch' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>{order.status}</span>
                </td>
                <td className="py-3 px-4"><FaCog className="text-gray-500 cursor-pointer" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <span className="text-gray-500">Showing 6-12 of 28</span>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((page) => (
            <button key={page} className="w-8 h-8 rounded-full border flex items-center justify-center text-gray-600 hover:bg-gray-200">{page}</button>
          ))}
        </div>
      </div>
    </div>
    </AppLayout>
  );
};

export default Order;
