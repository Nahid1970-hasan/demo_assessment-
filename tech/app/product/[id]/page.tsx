"use client";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../store/cartSlice";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${params.id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [params.id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      router.push(`/checkout/${product.id}`);
    }
  };

  if (!product) return <div className="text-center p-8">Loading...</div>;

  return (
    <main className="min-h-screen p-8 bg-white flex flex-col items-center">
      <section className="max-w-xl w-full border rounded-lg p-6 shadow">
        <img
          src={product.image}
          alt={product.title}
          className="h-48 object-contain mx-auto mb-4"
          width={200}
          height={200}
        />
        <h1 className="text-2xl font-bold mb-2 text-center">{product.title}</h1>
        <p className="text-gray-700 mb-2 text-center">{product.category}</p>
        <p className="text-blue-600 font-bold mb-4 text-center">${product.price}</p>
        <p className="mb-4 text-center">{product.description}</p>
        <button onClick={handleAddToCart} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">Add to Cart</button>
      </section>
    </main>
  );
}
