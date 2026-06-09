"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

export default function Auth() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_AUTH_API_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? "Invalid credentials. Please try again.");
        return;
      }

      sessionStorage.setItem("auth", JSON.stringify(data));
      router.push("/dashboard");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col md:flex-row">
      {/* Left — hero image */}
      <div className="relative hidden md:flex md:w-1/2 lg:w-3/5">
        <Image
          src="/images/mkulima_auth_img.png"
          alt="Mkulima agriculture"
          fill
          priority
        />
      </div>

      {/* Right — login card */}
      <div className="flex flex-1 items-center justify-center bg-gray-50 px-6 py-12">
        <div className="w-full max-w-md space-y-8 bg-white rounded-2xl shadow-md px-8 py-10">
          <div className="md:hidden flex items-center gap-2">
            <span
              className="text-2xl font-bold"
              style={{ color: "var(--primary-color)" }}
            >
              Mkulima
            </span>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-600 uppercase">
              Welcome to
            </h2>
            <p className="text-3xl font-bold text-[var(--primary-color)] -mt-1">
              Inua MKulima - Subsidy Program
            </p>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-foreground"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                placeholder="John Doe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg border border-foreground/20 bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-foreground"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-foreground/20 bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group w-full flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary-color)] disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ backgroundColor: "var(--secondary-color)" }}
            >
              {loading ? "Signing in…" : "Sign in"}
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
