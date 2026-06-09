interface ProductTableSkeletonProps {
  rows?: number;
}

export function ProductTableSkeleton({ rows = 8 }: ProductTableSkeletonProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 text-xs uppercase text-gray-500 border-b border-gray-100">
          <tr>
            {["#", "", "Product", "Category", "Brand", "Price", "Discount", "Rating", "Stock", "Status"].map(
              (col) => (
                <th key={col} className="px-4 py-3 font-semibold whitespace-nowrap">
                  {col}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 animate-pulse">
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i} className="bg-white">
              <td className="px-4 py-3">
                <div className="h-3 w-4 bg-gray-200 rounded" />
              </td>
              <td className="px-4 py-3">
                <div className="w-10 h-10 bg-gray-200 rounded-lg" />
              </td>
              <td className="px-4 py-3">
                <div className="h-3 bg-gray-200 rounded w-32" />
              </td>
              <td className="px-4 py-3">
                <div className="h-3 bg-gray-200 rounded w-20" />
              </td>
              <td className="px-4 py-3">
                <div className="h-3 bg-gray-200 rounded w-16" />
              </td>
              <td className="px-4 py-3">
                <div className="h-3 bg-gray-200 rounded w-12" />
              </td>
              <td className="px-4 py-3">
                <div className="h-3 bg-gray-200 rounded w-10" />
              </td>
              <td className="px-4 py-3">
                <div className="h-3 bg-gray-200 rounded w-24" />
              </td>
              <td className="px-4 py-3">
                <div className="h-3 bg-gray-200 rounded w-8" />
              </td>
              <td className="px-4 py-3">
                <div className="h-5 bg-gray-200 rounded-full w-20" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
