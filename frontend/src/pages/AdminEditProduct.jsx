import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";
import toast from "react-hot-toast";

function AdminEditProduct() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    category_id: "",
    name_ar: "",
    name_en: "",
    description_ar: "",
    description_en: "",
    price: "",
    discount_price: "",
    stock: "",
    is_featured: false,
    is_antique: false,
    material: "",
    color: "",
    dimensions: "",
    rating: "5",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          api.get("/products"),
          api.get("/categories"),
        ]);

        setProducts(productsRes.data);
        setCategories(categoriesRes.data);
      } catch (error) {
        toast.error("Failed to load data");
      }
    };

    fetchData();
  }, []);

  const handleSelect = (e) => {
    const productId = e.target.value;
    setSelectedId(productId);

    const selectedProduct = products.find(
      (product) => product.id === Number(productId)
    );

    if (selectedProduct) {
      setFormData({
        category_id: selectedProduct.category_id || "",
        name_ar: selectedProduct.name_ar || "",
        name_en: selectedProduct.name_en || "",
        description_ar: selectedProduct.description_ar || "",
        description_en: selectedProduct.description_en || "",
        price: selectedProduct.price || "",
        discount_price: selectedProduct.discount_price || "",
        stock: selectedProduct.stock || "",
        is_featured: !!selectedProduct.is_featured,
        is_antique: !!selectedProduct.is_antique,
        material: selectedProduct.material || "",
        color: selectedProduct.color || "",
        dimensions: selectedProduct.dimensions || "",
        rating: selectedProduct.rating || "5",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedId) {
      toast.error("Please select a product first");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key === "is_featured" || key === "is_antique") {
          data.append(key, value ? "1" : "0");
        } else {
          data.append(key, value);
        }
      });

      if (image) {
        data.append("image", image);
      }

      data.append("_method", "PUT");

      await api.post(`/admin/products/${selectedId}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product updated successfully");
    } catch (error) {
      console.log("EDIT ERROR:", error.response?.data);
      toast.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5ef] via-white to-[#f3eadb] dark:from-[#0f172a] dark:via-[#132033] dark:to-[#1a2c44]">
      <Navbar />

      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="rounded-3xl border border-[#eadfcb] bg-white p-8 shadow-md dark:border-[#2d4a63] dark:bg-[#132033]">
          <h1 className="mb-6 text-4xl font-extrabold text-[#1e3a5f] dark:text-[#f8e7b0]">
            Edit Product
          </h1>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <select
              value={selectedId}
              onChange={handleSelect}
              className="rounded-2xl border border-gray-300 px-4 py-3 dark:border-[#35526b] dark:bg-[#102038] dark:text-white"
            >
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name_en}
                </option>
              ))}
            </select>

            {selectedId && (
              <>
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  className="rounded-2xl border border-gray-300 px-4 py-3 dark:border-[#35526b] dark:bg-[#102038] dark:text-white"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name_en}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  name="name_ar"
                  value={formData.name_ar}
                  onChange={handleChange}
                  placeholder="Product Name Arabic"
                  className="rounded-2xl border border-gray-300 px-4 py-3 dark:border-[#35526b] dark:bg-[#102038] dark:text-white"
                  required
                />

                <input
                  type="text"
                  name="name_en"
                  value={formData.name_en}
                  onChange={handleChange}
                  placeholder="Product Name English"
                  className="rounded-2xl border border-gray-300 px-4 py-3 dark:border-[#35526b] dark:bg-[#102038] dark:text-white"
                  required
                />

                <textarea
                  name="description_ar"
                  value={formData.description_ar}
                  onChange={handleChange}
                  placeholder="Description Arabic"
                  className="rounded-2xl border border-gray-300 px-4 py-3 dark:border-[#35526b] dark:bg-[#102038] dark:text-white"
                  required
                />

                <textarea
                  name="description_en"
                  value={formData.description_en}
                  onChange={handleChange}
                  placeholder="Description English"
                  className="rounded-2xl border border-gray-300 px-4 py-3 dark:border-[#35526b] dark:bg-[#102038] dark:text-white"
                  required
                />

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price"
                  className="rounded-2xl border border-gray-300 px-4 py-3 dark:border-[#35526b] dark:bg-[#102038] dark:text-white"
                  required
                />

                <input
                  type="number"
                  name="discount_price"
                  value={formData.discount_price}
                  onChange={handleChange}
                  placeholder="Discount Price"
                  className="rounded-2xl border border-gray-300 px-4 py-3 dark:border-[#35526b] dark:bg-[#102038] dark:text-white"
                />

                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="Stock"
                  className="rounded-2xl border border-gray-300 px-4 py-3 dark:border-[#35526b] dark:bg-[#102038] dark:text-white"
                  required
                />

                <input
                  type="text"
                  name="material"
                  value={formData.material}
                  onChange={handleChange}
                  placeholder="Material"
                  className="rounded-2xl border border-gray-300 px-4 py-3 dark:border-[#35526b] dark:bg-[#102038] dark:text-white"
                />

                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  placeholder="Color"
                  className="rounded-2xl border border-gray-300 px-4 py-3 dark:border-[#35526b] dark:bg-[#102038] dark:text-white"
                />

                <input
                  type="text"
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleChange}
                  placeholder="Dimensions"
                  className="rounded-2xl border border-gray-300 px-4 py-3 dark:border-[#35526b] dark:bg-[#102038] dark:text-white"
                />

                <input
                  type="number"
                  step="0.1"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  placeholder="Rating"
                  className="rounded-2xl border border-gray-300 px-4 py-3 dark:border-[#35526b] dark:bg-[#102038] dark:text-white"
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="rounded-2xl border border-gray-300 px-4 py-3 dark:border-[#35526b] dark:bg-[#102038] dark:text-white"
                />

                <label className="flex items-center gap-2 text-sm dark:text-white">
                  <input
                    type="checkbox"
                    name="is_featured"
                    checked={formData.is_featured}
                    onChange={handleChange}
                  />
                  Featured Product
                </label>

                <label className="flex items-center gap-2 text-sm dark:text-white">
                  <input
                    type="checkbox"
                    name="is_antique"
                    checked={formData.is_antique}
                    onChange={handleChange}
                  />
                  Antique Product
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 rounded-2xl bg-[#1e3a5f] px-6 py-3 font-semibold text-white transition hover:bg-[#16304f] disabled:cursor-not-allowed disabled:opacity-70 dark:bg-[#35c6c6] dark:text-[#0f172a] dark:hover:bg-[#24b2b2]"
                >
                  {loading ? "Updating..." : "Update Product"}
                </button>
              </>
            )}
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AdminEditProduct;