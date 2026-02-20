import { useEffect, useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";
import StarRating from "../components/StarRating";
import toast from "react-hot-toast";

export default function Stores() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);
  const limit = 6;

  const fetchStores = async () => {
    const res = await api.get("/stores");
    setStores(res.data);
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleRate = async (id, rating) => {
    try {
      await api.post("/stores/rate", { storeId: id, rating });
      toast.success("Rated successfully");
      fetchStores();
    } catch {
      toast.error("Error rating");
    }
  };

  const filtered = stores
    .filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sort === "asc"
        ? a.averageRating - b.averageRating
        : b.averageRating - a.averageRating,
    );

  const paginated = filtered.slice((page - 1) * limit, page * limit);
  const totalPages = Math.ceil(filtered.length / limit);

  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-6">Explore Stores</h2>

      <div className="flex gap-4 mb-6">
        <input
          className="border p-2 rounded"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="desc">High to Low</option>
          <option value="asc">Low to High</option>
        </select>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {paginated.map((store) => (
          <div key={store.id} className="bg-white shadow-lg rounded-xl p-5">
            <h3 className="font-semibold">{store.name}</h3>
            <p className="text-gray-500 text-sm">{store.address}</p>
            <p className="mt-2">Avg: {store.averageRating?.toFixed(1)}</p>
            <div className="mt-2">
              <StarRating
                rating={store.userRating || 0}
                onRate={(r) => handleRate(store.id, r)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8 gap-3">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Prev
        </button>

        <span>
          {page}/{totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>
    </Layout>
  );
}
