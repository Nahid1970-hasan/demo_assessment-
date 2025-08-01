import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-gray-100 py-4 shadow mb-8">
      <div className="max-w-5xl mx-auto flex justify-between items-center px-4">
        <div className="font-bold text-xl text-blue-700">E-Shop</div>
        <div className="flex gap-6">
          <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
          <Link href="/cart" className="text-gray-700 hover:text-blue-600 font-medium">Cart</Link>
        </div>
      </div>
    </nav>
  );
}
