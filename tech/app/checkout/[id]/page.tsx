"use client";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import type { RootState } from "../../../store";
import { clearCart, addToCart, removeFromCart } from "../../../store/cartSlice";
import { addOrder } from "../../../store/ordersSlice";

export default function CheckoutPage({ params }: { params: { id: string } }) {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: "", address: "", phone: "" });
  const [errors, setErrors] = useState<{ name?: string; address?: string; phone?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  // Find the product in cart by id
  const product = cartItems.find(item => item.id === Number(params.id));
  const total = product ? product.price * product.quantity : 0;

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!form.name.trim()) newErrors.name = "Full Name is required.";
    if (!form.address.trim()) newErrors.address = "Shipping Address is required.";
    if (!/^\d{10,15}$/.test(form.phone.trim())) newErrors.phone = "Valid phone number required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !product) return;
    dispatch(addOrder({
      id: Date.now(),
      name: form.name,
      address: form.address,
      phone: form.phone,
      items: [product],
      total,
      date: new Date().toISOString(),
    }));
    dispatch(clearCart());
    setSubmitted(true);
  };

  const handleQuantity = (type: "inc" | "dec") => {
    if (!product) return;
    if (type === "inc") dispatch(addToCart(product));
    if (type === "dec" && product.quantity > 1) dispatch(removeFromCart(product.id));
  };

  if (submitted) {
    return (
      <main className="min-h-screen p-8 flex flex-col items-center">
        <section className="max-w-lg w-full border rounded-lg p-6 shadow text-center">
          <h1 className="text-2xl font-bold mb-4 text-green-700">Thank You!</h1>
          <p>Your order has been placed successfully.</p>
        </section>
      </main>
    );
  }

  if (!product) return <div className="text-center p-8">No product in cart.</div>;

  return (
    <main className="min-h-screen p-8 flex flex-col items-center">
      <section className="max-w-2xl w-full border rounded-lg p-6 shadow flex flex-col md:flex-row gap-8">
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
          <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
          <input
            name="address"
            type="text"
            placeholder="Shipping Address"
            value={form.address}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
          {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
          <input
            name="phone"
            type="text"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
          {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
          <div className="font-bold text-lg mt-2">Total: <span className="text-blue-700">৳ {total}</span></div>
          <button type="submit" className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition mt-4">Place Order</button>
        </form>
        <div className="flex flex-col items-center justify-center w-64">
          <img src={product.image} alt={product.title} className="h-16 w-16 object-contain border rounded mb-2" />
          <div className="font-semibold mb-2 text-center">{product.title}</div>
          <div className="flex items-center gap-2 justify-center mb-2">
            <button onClick={() => handleQuantity("dec")} className="px-2 py-1 border rounded-l bg-gray-100">-</button>
            <span className="px-4 py-1 border-t border-b">{product.quantity}</span>
            <button onClick={() => handleQuantity("inc")} className="px-2 py-1 border rounded-r bg-gray-100">+</button>
          </div>
          <div className="font-bold text-blue-700">৳ {total}</div>
        </div>
      </section>
    </main>
  );
}
