"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import type { AuthData } from "./types";
import { fetchProducts } from "./utils/api";
import { DashboardHeader } from "./components/DashboardHeader";
import { ProductTable } from "./components/ProductTable";
import { ProductTableSkeleton } from "./components/ProductTableSkeleton";
import { ErrorState } from "./components/ErrorState";
import { EmptyState } from "./components/EmptyState";

export default function DashboardPage() {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const raw = sessionStorage.getItem("auth");
    if (!raw) {
      router.replace("/");
      return;
    }
    try {
      const data: AuthData = JSON.parse(raw);
      const fullName =
        data.firstName && data.lastName
          ? `${data.firstName} ${data.lastName}`
          : (data.username ?? null);
      setUserName(fullName);
      setUserImage(data.image ?? null);
    } catch {
      router.replace("/");
      return;
    }
    setAuthChecked(true);
  }, [router]);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(id);
  }, [searchQuery]);

  const {
    data: products,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    enabled: authChecked,
  });

  function handleLogout() {
    sessionStorage.removeItem("auth");
    router.replace("/");
  }

  const filteredProducts = products?.filter((p) =>
    p.title.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  if (!authChecked) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader
        userName={userName}
        userImage={userImage}
        onLogout={handleLogout}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Products</h1>
          <input
            type="search"
            placeholder="Search by title…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-72 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-slate-700 placeholder-gray-400 shadow-sm outline-none focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)]"
          />
        </div>

        {isError && (
          <ErrorState message={error?.message} onRetry={() => refetch()} />
        )}

        {!isLoading && !isError && filteredProducts?.length === 0 && (
          <EmptyState />
        )}

        {isLoading && <ProductTableSkeleton />}

        {!isLoading && !isError && filteredProducts && filteredProducts.length > 0 && (
          <ProductTable products={filteredProducts} />
        )}
      </main>
    </div>
  );
}
