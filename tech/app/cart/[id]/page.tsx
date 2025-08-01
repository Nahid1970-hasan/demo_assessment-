"use client";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../store";
import { removeFromCart, clearCart } from "../../../store/cartSlice";

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="min-h-screen p-8 bg-white flex flex-col items-center">
      <section className="max-w-2xl w-full border rounded-lg p-6 shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <ul className="mb-6">
              {cartItems.map((item) => (
                <li key={item.id} className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.title} className="h-12 w-12 object-contain border rounded" />
                    <div>
                      <div className="font-semibold">{item.title}</div>
                      <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-blue-600">৳ {item.price * item.quantity}</span>
                    <button onClick={() => dispatch(removeFromCart(item.id))} className="text-red-500 hover:underline">Remove</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-lg">Total:</span>
              <span className="font-bold text-2xl text-blue-700">৳ {total}</span>
            </div>
            <button onClick={() => dispatch(clearCart())} className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition">Clear Cart</button>
          </>
        )}
      </section>
    </main>
  );
}
