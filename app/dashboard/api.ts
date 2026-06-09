import type { Product } from "./types";

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(process.env.NEXT_PUBLIC_PRODUCTS_API_URL!);
  if (!res.ok) throw new Error("Failed to load products. Please try again.");
  const data = await res.json();
  return data.products ?? data;
}
