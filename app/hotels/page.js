"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {ShimmerList} from "@/components/Shimmer";

export default function HotelsPage() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/hotels")
      .then((res) => res.json())
      .then((data) => {
        setHotels(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="max-w-6xl mx-auto p-6"><ShimmerList /></div>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Book Hotels</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {hotels.map((hotel) => (
          <div 
            key={hotel._id} 
            className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
          >
            <img 
              src={hotel.image} 
              alt={hotel.name} 
              className="w-full h-56 object-cover"
            />
            
            <div className="p-5">
              <h2 className="text-2xl font-semibold text-gray-800">{hotel.name}</h2>
              <p className="text-gray-600">{hotel.location}</p>
              <p className="text-blue-600 font-semibold text-lg mt-2">${hotel.price || "N/A"} per night</p>

              <button 
                onClick={() => router.push(`/hotels/${hotel._id}`)}
                className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
