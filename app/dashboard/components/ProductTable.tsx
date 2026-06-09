import Image from "next/image";
import type { Product } from "../types";
import { StarRating } from "./StarRating";

interface ProductTableProps {
  products: Product[];
}

function AvailabilityBadge({ status }: { status: string }) {
  const inStock = status.toLowerCase().includes("in stock");
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
        inStock
          ? "bg-green-50 text-green-700"
          : "bg-red-50 text-red-600"
      }`}
    >
      {status}
    </span>
  );
}

export function ProductTable({ products }: ProductTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 text-xs uppercase text-gray-500 border-b border-gray-100">
          <tr>
            <th className="px-4 py-3 font-semibold table-header">#</th>
            <th className="px-4 py-3 font-semibold table-header"></th>
            <th className="px-4 py-3 font-semibold table-header">Product</th>
            <th className="px-4 py-3 font-semibold table-header whitespace-nowrap">Category</th>
            <th className="px-4 py-3 font-semibold table-header">Brand</th>
            <th className="px-4 py-3 font-semibold table-header">Price</th>
            <th className="px-4 py-3 font-semibold table-header">Discount</th>
            <th className="px-4 py-3 font-semibold table-header">Rating</th>
            <th className="px-4 py-3 font-semibold table-header">Stock</th>
            <th className="px-4 py-3 font-semibold table-header">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {products.map((product, index) => (
            <tr
              key={product.id}
              className="bg-white hover:bg-gray-50/60 transition-colors"
            >
              <td className="px-4 py-3 text-gray-400 text-xs">{index + 1}</td>
              <td className="px-4 py-3">
                <div className="relative w-10 h-10 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    sizes="40px"
                    className="object-contain p-1"
                  />
                </div>
              </td>
              <td className="px-4 py-3 max-w-[200px]">
                <p className="font-medium text-slate-800 truncate">
                  {product.title}
                </p>
              </td>
              <td className="px-4 py-3">
                <span className="text-xs font-medium text-[var(--primary-color)] uppercase tracking-wide">
                  {product.category}
                </span>
              </td>
              <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                {product.brand ?? <span className="text-gray-300">—</span>}
              </td>
              <td className="px-4 py-3 font-semibold text-slate-900 whitespace-nowrap">
                ${product.price.toFixed(2)}
              </td>
              <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                {product.discountPercentage.toFixed(1)}%
              </td>
              <td className="px-4 py-3">
                <StarRating rating={product.rating} />
              </td>
              <td className="px-4 py-3 text-slate-600">{product.stock}</td>
              <td className="px-4 py-3">
                <AvailabilityBadge status={product.availabilityStatus} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
