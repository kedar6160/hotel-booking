"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    console.log("🔹 Sending registration request...", form);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const errMsg = await res.text();
      console.log("Registration failed:", errMsg);
      setError(errMsg);
      return;
    }

    console.log("✅ Registration successful, redirecting to login...");
    router.push("/auth/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Create an Account
        </h2>

        {error && <p className="mt-4 text-center text-red-500">{error}</p>}

        <form onSubmit={handleRegister} className="mt-6 space-y-4">
          <div>
            <label className="block text-left text-gray-700 font-medium">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="mt-1 w-full rounded border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-left text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="mt-1 w-full rounded border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-left text-gray-700 font-medium">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="mt-1 w-full rounded border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded bg-yellow-500 px-4 py-3 text-white font-semibold hover:bg-yellow-600 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <a
            href="/auth/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
