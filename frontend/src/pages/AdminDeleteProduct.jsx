import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";
import toast from "react-hot-toast";

function AdminDeleteProduct() {
  const [products, setProducts] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
const [showModal, setShowModal] = useState(false)

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (error) {
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openDeleteModal = (product) => {
  setProductToDelete(product);
  setShowModal(true);
};

const handleDelete = async () => {
  if (!productToDelete) return;

  setLoadingId(productToDelete.id);

  try {
    await api.delete(`/admin/products/${productToDelete.id}`);
    toast.success("Product deleted successfully");
    setProducts((prev) =>
      prev.filter((product) => product.id !== productToDelete.id)
    );
    setShowModal(false);
    setProductToDelete(null);
  } catch (error) {
    console.log("DELETE ERROR:", error.response?.data);
    toast.error("Failed to delete product");
  } finally {
    setLoadingId(null);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5ef] via-white to-[#f3eadb] dark:from-[#0f172a] dark:via-[#132033] dark:to-[#1a2c44]">
      <Navbar />

      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-3xl border border-[#eadfcb] bg-white p-8 shadow-md dark:border-[#2d4a63] dark:bg-[#132033]">
          <h1 className="mb-6 text-4xl font-extrabold text-[#1e3a5f] dark:text-[#f8e7b0]">
            Delete Product
          </h1>

          <div className="grid gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col gap-4 rounded-2xl border border-[#eadfcb] p-4 dark:border-[#35526b] md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={`/${product.image}`}
                    alt={product.name_en}
                    className="h-16 w-16 rounded-xl bg-white object-contain"
                  />

                  <div>
                    <h2 className="text-lg font-bold text-[#1e3a5f] dark:text-[#35c6c6]">
                      {product.name_en}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      ${product.price}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => openDeleteModal(product)}
                  disabled={loadingId === product.id}
                  className="rounded-2xl border border-red-300 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-70 dark:border-red-500/40 dark:text-red-400 dark:hover:bg-red-500/10"
                >
                  {loadingId === product.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
{showModal && productToDelete && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
    <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl dark:bg-[#132033]">
      <h2 className="text-2xl font-extrabold text-[#1e3a5f] dark:text-[#f8e7b0]">
        Confirm Delete
      </h2>

      <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
        Are you sure you want to delete{" "}
        <span className="font-bold">{productToDelete.name_en}</span>?
      </p>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => {
            setShowModal(false);
            setProductToDelete(null);
          }}
          className="flex-1 rounded-2xl border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-[#35526b] dark:text-white dark:hover:bg-[#102038]"
        >
          Cancel
        </button>

        <button
          onClick={handleDelete}
          disabled={loadingId === productToDelete.id}
          className="flex-1 rounded-2xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loadingId === productToDelete.id ? "Deleting..." : "Yes, Delete"}
        </button>
      </div>
    </div>
  </div>
)}
      <Footer />
    </div>
  );
}

export default AdminDeleteProduct;