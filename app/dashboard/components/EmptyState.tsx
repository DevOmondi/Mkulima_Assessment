export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-3">
      <svg
        className="w-12 h-12 text-gray-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"
        />
      </svg>
      <p className="text-slate-500 text-sm font-medium">
        No products available at the moment.
      </p>
    </div>
  );
}
