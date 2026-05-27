export default function SearchBar({
  search,
  setSearch
}) {

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-8">

      <h2 className="text-2xl font-semibold mb-4">
        Search Products
      </h2>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full border p-3 rounded-lg"
      />

    </div>
  )
}
