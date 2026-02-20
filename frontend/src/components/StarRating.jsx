export default function StarRating({ rating = 0, onRate }) {
  return (
    <div className="flex gap-1 text-2xl">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onRate(star)}
          className={`cursor-pointer transition ${
            star <= rating
              ? "text-yellow-400"
              : "text-gray-300 hover:text-yellow-400"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  )
}