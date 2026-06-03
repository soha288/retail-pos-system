import {
  Search
} from 'lucide-react'

export default function SearchBar({
  search,
  setSearch
}) {

  return (

    <div className="relative">

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-96 bg-slate-100 border border-slate-200 rounded-2xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-300"
      />

      <Search
        size={20}
        className="absolute left-4 top-3.5 text-slate-400"
      />

    </div>
  )
}
