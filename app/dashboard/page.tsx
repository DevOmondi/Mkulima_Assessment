"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import type { AuthData } from "./types";
import { fetchProducts } from "./api";
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

  if (!authChecked) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader
        userName={userName}
        userImage={userImage}
        onLogout={handleLogout}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Products</h1>

        {isError && (
          <ErrorState message={error?.message} onRetry={() => refetch()} />
        )}

        {!isLoading && !isError && products?.length === 0 && <EmptyState />}

        {isLoading && <ProductTableSkeleton />}

        {!isLoading && !isError && products && products.length > 0 && (
          <ProductTable products={products} />
        )}
      </main>
    </div>
  );
}
