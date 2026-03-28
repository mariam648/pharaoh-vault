import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";
import toast from "react-hot-toast";

function AdminAddProduct() {
  const [categories, setCategories] = useState([]);
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
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data);
      } catch (error) {
        toast.error("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

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

      await api.post("/admin/products", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product added successfully");

      setFormData({
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

      setImage(null);
    } catch (error) {
      console.log("ERROR DATA:", error.response?.data);
      console.log("ERROR ERRORS:", error.response?.data?.errors);
      toast.error("Something went wrong while adding the product");
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
            Add New Product
          </h1>

          <form onSubmit={handleSubmit} className="grid gap-4">
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
              placeholder="Product Name Arabic"
              value={formData.name_ar}
              onChange={handleChange}
              className="rounded-2xl border border-gray-300 px-4 py-3 dark:border-[#35526b] dark:bg-[#102038] dark:text-white"
              required
            />

            <input
              type="text"
              name="name_en"
              placeholder="Product Name English"
              value={formData.name_en}
              onChange={handleChange}
              className="rounded-2xl border border-gray-300 px-4 py-3 dark:border-[#35526b] dark:bg-[#102038] dark:text-white"
              required
            />

            <textarea
              name="description_ar"
              placeholder="Description Arabic"
              value={formData.description_ar}
              onChange={handleChange}
              className="rounded-2xl border border-gray-300 px-4 py-3 dark:border-[#35526b] dark:bg-[#102038] dark:text-white"
              required
            />

            <textarea
              name="description_en"
              placeholder="Description English"
              value={formData.description_en}
              onChange={handleChange}
              className="rounded-2xl border border-gray-300 px-4 py-3 dark:border-[#35526b] dark:bg-[#102038] dark:text-white"
              required
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="rounded-2xl border border-gray-300 px-4 py-3 dark:border-[#35526b] dark:bg-[#102038] dark:text-white"
              required
            />

            <input
              type="number"
              name="discount_price"
              placeholder="Discount Price"
              value={formData.discount_price}
              onChange={handleChange}
              className="rounded-2xl border border-gray-300 px-4 py-3 dark:border-[#35526b] dark:bg-[#102038] dark:text-white"
            />

            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={formData.stock}
              onChange={handleChange}
              className="rounded-2xl border border-gray-300 px-4 py-3 dark:border-[#35526b] dark:bg-[#102038] dark:text-white"
              required
            />

            <input
              type="text"
              name="material"
              placeholder="Material"
              value={formData.material}
              onChange={handleChange}
              className="rounded-2xl border border-gray-300 px-4 py-3 dark:border-[#35526b] dark:bg-[#102038] dark:text-white"
            />

            <input
              type="text"
              name="color"
              placeholder="Color"
              value={formData.color}
              onChange={handleChange}
              className="rounded-2xl border border-gray-300 px-4 py-3 dark:border-[#35526b] dark:bg-[#102038] dark:text-white"
            />

            <input
              type="text"
              name="dimensions"
              placeholder="Dimensions"
              value={formData.dimensions}
              onChange={handleChange}
              className="rounded-2xl border border-gray-300 px-4 py-3 dark:border-[#35526b] dark:bg-[#102038] dark:text-white"
            />

            <input
              type="number"
              step="0.1"
              name="rating"
              placeholder="Rating"
              value={formData.rating}
              onChange={handleChange}
              className="rounded-2xl border border-gray-300 px-4 py-3 dark:border-[#35526b] dark:bg-[#102038] dark:text-white"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="rounded-2xl border border-gray-300 px-4 py-3 dark:border-[#35526b] dark:bg-[#102038] dark:text-white"
              required
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
              {loading ? "Adding..." : "Add Product"}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AdminAddProduct;