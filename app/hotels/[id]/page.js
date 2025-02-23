"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Shimmer } from "@/components/Shimmer";

export default function HotelDetails() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/hotels/${id}`, {
      method: "GET",
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        return res.json();
      })
      .then((data) => {
        setHotel(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-6">
        <Shimmer />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-3xl font-bold text-center mb-4">{hotel.name}</h1>
      <img src={hotel.image} alt={hotel.name} className="w-full h-80 object-cover rounded-lg" />
      <p className="text-gray-700 mt-4">{hotel.location}</p>
      <p className="text-blue-600 font-semibold text-lg">${hotel.price} per night</p>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => router.push("/hotels")}
          className="w-1/2 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition"
        >
          ← Back to Hotels
        </button>
        <button className="w-1/2 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition">
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
