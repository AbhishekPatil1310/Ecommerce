export default function PriceBar({ maxPrice, setMaxPrice }) {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-semibold">
        Max Price: ₹{maxPrice}
      </label>
      <input
        type="range"
        min="0"
        max="200000"
        value={maxPrice}
        onChange={(e) => setMaxPrice(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
}
