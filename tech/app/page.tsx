"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Head from "next/head";
import type { RootState } from "../store";
import { fetchProducts } from "../store/productsSlice";

export default function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => (state.products as any).items);
  const loading = useSelector((state: RootState) => (state.products as any).loading);
  const error = useSelector((state: RootState) => (state.products as any).error);

  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Home | E-commerce Showcase</title>
        <meta name="description" content="Browse our product collection. SEO-optimized Next.js e-commerce demo." />
      </Head>
      <main className="min-h-screen p-8 bg-white">
        <h1 className="text-3xl font-bold mb-8 text-center">Product Showcase</h1>
        {loading ? (
          <p className="text-center">Loading products...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {(products as any[]).map((product: any) => (
              <article key={product.id} className="border rounded-lg p-4 flex flex-col items-center shadow hover:shadow-lg transition">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-32 object-contain mb-4"
                  width={150}
                  height={150}
                  loading="lazy"
                />
                <h2 className="font-semibold text-lg mb-2 text-center">{product.title}</h2>
                <p className="text-blue-600 font-bold mb-2">${product.price}</p>
                <a
                  href={`/product/${product.id}`}
                  className="mt-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  View Details
                </a>
              </article>
            ))}
          </section>
        )}
      </main>
    </>
  );
}
