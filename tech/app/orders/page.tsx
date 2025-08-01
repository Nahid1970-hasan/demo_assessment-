import Head from "next/head";
"use client";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import Link from "next/link";

export default function OrdersPage() {
  const orders = useSelector((state: RootState) => state.orders.orders);

  return (
    <>
      <Head>
        <title>Order List | E-commerce Showcase</title>
        <meta name="description" content="View all placed orders and their details." />
      </Head>
      <main className="min-h-screen p-8 bg-white">
        <section className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Order List</h1>
          {orders.length === 0 ? (
            <p className="text-center text-gray-500">No orders placed yet.</p>
          ) : (
            <table className="w-full border rounded-lg shadow">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Order ID</th>
                  <th className="p-3 text-left">Customer Name</th>
                  <th className="p-3 text-left">Total Items</th>
                  <th className="p-3 text-left">Total Amount</th>
                  <th className="p-3 text-left">Order Date</th>
                  <th className="p-3 text-left">Details</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id} className="border-t">
                    <td className="p-3">{order.id}</td>
                    <td className="p-3">{order.name}</td>
                    <td className="p-3">{order.items.reduce((sum, item) => sum + item.quantity, 0)}</td>
                    <td className="p-3">৳ {order.total}</td>
                    <td className="p-3">{new Date(order.date).toLocaleString()}</td>
                    <td className="p-3">
                      <Link href={`/orders/${order.id}`} className="text-blue-600 hover:underline">View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </>
  );
}
