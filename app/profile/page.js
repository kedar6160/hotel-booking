"use client";
import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";

export default function Profile() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    age: "",
    dob: "",
    contact: "",
  });

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/users/me", { credentials: "include" })
        .then(async (res) => {
          if (!res.ok) throw new Error(await res.text());
          return res.json();
        })
        .then((data) => {
          setUser(data);
          setForm({
            name: data.name || "",
            age: data.age || "",
            dob: data.dob || "",
            contact: data.contact || "",
          });
        })
        .catch((err) => setError(err.message));
    }
  }, [status, session]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/users/update", {
      method: "PUT",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();
    if (res.ok) {
      setUser(result.user);
      setIsEditing(false);
    } else {
      setError(result.error);
    }
  };

  if (status === "loading")
    return <p className="text-center text-gray-500 mt-4">Loading...</p>;

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg text-center">
          <p className="text-red-500 text-lg">
            You must be logged in to view this page.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={() => signIn()}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Login
            </button>
            <a
              href="/auth/register"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            >
              Signup
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (error)
    return <div className="text-red-500 text-center mt-4">Error: {error}</div>;

  if (!user) {
    return <p className="text-center text-gray-500 mt-4">Loading Profile...</p>;
  }

  return (
    <>
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Profile
        </h2>

        {isEditing ? (
          <form onSubmit={handleUpdate} className="space-y-6">
 
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-left text-gray-700 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="mt-1 w-full rounded border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-left text-gray-700 font-medium">
                  Age
                </label>
                <input
                  type="number"
                  placeholder="Enter your age"
                  className="mt-1 w-full rounded border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-left text-gray-700 font-medium">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="mt-1 w-full rounded border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={form.dob}
                  onChange={(e) => setForm({ ...form, dob: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-left text-gray-700 font-medium">
                  Contact
                </label>
                <input
                  type="text"
                  placeholder="Enter your contact"
                  className="mt-1 w-full rounded border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={form.contact}
                  onChange={(e) =>
                    setForm({ ...form, contact: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="w-full bg-gray-500 text-white py-3 rounded-md hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <p className="text-left">
                <span className="font-semibold text-gray-700">Name:</span>{" "}
                {user.name}
              </p>
              <p className="text-left">
                <span className="font-semibold text-gray-700">Email:</span>{" "}
                {user.email}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <p className="text-left">
                <span className="font-semibold text-gray-700">Age:</span>{" "}
                {user.age || "N/A"}
              </p>
              <p className="text-left">
                <span className="font-semibold text-gray-700">
                  Date of Birth:
                </span>{" "}
                {user.dob || "N/A"}
              </p>
            </div>

            <p className="text-left">
              <span className="font-semibold text-gray-700">Contact:</span>{" "}
              {user.contact || "N/A"}
            </p>

            <button
              onClick={() => setIsEditing(true)}
              className="w-full bg-yellow-500 text-white py-2 rounded-md mt-4 hover:bg-yellow-600 transition"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </>
  );
}
