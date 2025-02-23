export function Shimmer() {
  return (
    <div className="animate-pulse w-80 space-y-4">
      <div className="bg-gray-300 h-8 w-3/4 rounded"></div>
      <div className="bg-gray-300 h-60 w-full rounded-lg"></div>
      <div className="bg-gray-300 h-6 w-1/2 rounded"></div>
      <div className="bg-gray-300 h-6 w-1/4 rounded"></div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-300 h-12 w-full rounded"></div>
        <div className="bg-gray-300 h-12 w-full rounded"></div>
      </div>
    </div>
  );
}

export function ShimmerList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(6)
        .fill("")
        .map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse w-80 mx-auto"
          >
            <div className="bg-gray-300 h-48 w-full"></div>
            <div className="p-4 space-y-3">
              <div className="bg-gray-300 h-6 w-3/4 rounded"></div>
              <div className="bg-gray-300 h-5 w-1/2 rounded"></div>
              <div className="bg-gray-300 h-5 w-1/4 rounded"></div>
              <div className="bg-gray-300 h-10 w-full rounded"></div>
            </div>
          </div>
        ))}
    </div>
  );
}
