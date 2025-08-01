import Head from "next/head";
"use client";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { useParams } from "next/navigation";

export default function OrderDetailPage() {
  const { id } = useParams();
  const orders = useSelector((state: RootState) => state.orders.orders);
  const order = orders.find(o => o.id === Number(id));

  if (!order) return <main className="min-h-screen p-8 text-center">Order not found.</main>;

  return (
    <>
      <Head>
        <title>Order #{order.id} | E-commerce Showcase</title>
        <meta name="description" content={`Order details for ${order.name}, placed on ${new Date(order.date).toLocaleString()}.`} />
      </Head>
      <main className="min-h-screen p-8 bg-white flex flex-col items-center">
        <section className="max-w-2xl w-full border rounded-lg p-6 shadow">
          <h1 className="text-2xl font-bold mb-4 text-center">Order #{order.id}</h1>
          <div className="mb-2"><span className="font-semibold">Customer:</span> {order.name}</div>
          <div className="mb-2"><span className="font-semibold">Address:</span> {order.address}</div>
          <div className="mb-2"><span className="font-semibold">Phone:</span> {order.phone}</div>
          <div className="mb-2"><span className="font-semibold">Order Date:</span> {new Date(order.date).toLocaleString()}</div>
          <div className="mb-4"><span className="font-semibold">Total Amount:</span> <span className="text-blue-700 font-bold">৳ {order.total}</span></div>
          <h2 className="text-lg font-bold mb-2">Items</h2>
          <ul>
            {order.items.map(item => (
              <li key={item.id} className="flex items-center gap-4 mb-2">
                <img src={item.image} alt={item.title} className="h-12 w-12 object-contain border rounded" />
                <div>{item.title}</div>
                <div className="bg-gray-800 text-white px-2 py-1 rounded text-xs">× {item.quantity}</div>
                <div className="font-bold text-blue-700">৳ {item.price * item.quantity}</div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
