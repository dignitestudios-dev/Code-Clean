// Skeleton Rows Component
const SkeletonRows = ({ count = 6 }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <tr key={i} className="animate-pulse border-t">
        {/* # */}
        <td className="px-6 py-4">
          <div className="h-4 w-6 bg-gray-200 rounded" />
        </td>

        {/* Booker */}
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200" />
            <div className="h-4 w-32 bg-gray-200 rounded" />
          </div>
        </td>

        {/* Booking Date */}
        <td className="px-6 py-4">
          <div className="h-4 w-28 bg-gray-200 rounded" />
        </td>

        {/* Booking Time */}
        <td className="px-6 py-4">
          <div className="h-4 w-20 bg-gray-200 rounded" />
        </td>

        {/* Duration */}
        <td className="px-6 py-4">
          <div className="h-4 w-16 bg-gray-200 rounded" />
        </td>

        {/* Status */}
        <td className="px-6 py-4">
          <div className="h-4 w-28 bg-gray-200 rounded" />
        </td>

        {/* Action */}
        <td className="px-6 py-4">
          <div className="h-8 w-16 bg-gray-200 rounded" />
        </td>
      </tr>
    ))}
  </>
);

export default SkeletonRows;