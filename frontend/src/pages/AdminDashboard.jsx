// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import api from "../services/api";
// import LoadingSpinner from "../components/LoadingSpinner";
// import EmptyState from "../components/EmptyState";
// import toast from "react-hot-toast";

// function AdminDashboard() {
//   const navigate = useNavigate();
//   const adminName = localStorage.getItem("adminName") || "Administrator";
//   const adminEmail = localStorage.getItem("adminEmail") || "admin@example.com";

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [search, setSearch] = useState("");
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);

//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return "";

//     try {
//       if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
//         const url = new URL(imagePath);
//         return `${url.pathname}${url.search}${url.hash}`;
//       }
//     } catch (error) {
//       console.error("Invalid image URL:", imagePath);
//     }

//     return imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
//   };

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await api.get("/products");
//         setProducts(res.data);
//       } catch (error) {
//         setError("Failed to load products");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("isAdmin");
//     localStorage.removeItem("adminName");
//     localStorage.removeItem("adminEmail");
//     toast.success("Logged out successfully");
//     navigate("/admin/login");
//   };

//   const openDetailsModal = (product) => {
//     setSelectedProduct(product);
//     setShowDetailsModal(true);
//   };

//   const filteredProducts = products.filter((product) => {
//     const text = `
//       ${product.name_en || ""}
//       ${product.name_ar || ""}
//       ${product.category?.name_en || ""}
//       ${product.category?.name_ar || ""}
//       ${product.price || ""}
//     `.toLowerCase();

//     return text.includes(search.toLowerCase());
//   });

//   const totalProducts = products.length;
//   const featuredProducts = products.filter(
//     (product) => product.is_featured
//   ).length;
//   const lowStockProducts = products.filter(
//     (product) => Number(product.stock) > 0 && Number(product.stock) <= 5
//   ).length;

//   const uniqueCategories = new Set(
//     products.map((product) => product.category?.name_en).filter(Boolean)
//   ).size;

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#f8f5ef] via-white to-[#f3eadb] dark:from-[#0f172a] dark:via-[#132033] dark:to-[#1a2c44]">
//       <Navbar />

//       <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10">
//         <div className="mb-8 overflow-hidden rounded-3xl border border-[#eadfcb] bg-gradient-to-r from-[#1e3a5f] via-[#284b75] to-[#c89b3c] p-8 shadow-xl dark:border-[#2d4a63] dark:from-[#132033] dark:via-[#1b3350] dark:to-[#35c6c6]">
//           <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
//             <div>
//               <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
//                 Pharaoh Vault Control Center
//               </p>

//               <h1 className="mt-3 text-4xl font-extrabold text-white">
//                 Admin Dashboard V2 TEST
//               </h1>

//               <p className="mt-3 text-lg text-white/90">
//                 Welcome back, <span className="font-bold">{adminName}</span>
//               </p>

//               <p className="mt-1 text-sm text-white/80">{adminEmail}</p>
//             </div>

//             <button
//               onClick={handleLogout}
//               className="rounded-2xl bg-white/15 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/25"
//             >
//               Logout
//             </button>
//           </div>

//           <div className="mt-6 flex flex-wrap gap-3">
//             <Link
//               to="/admin/add-product"
//               className="rounded-2xl bg-white/15 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/25"
//             >
//               Add Product
//             </Link>

//             <Link
//               to="/admin/edit-product"
//               className="rounded-2xl bg-white/15 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/25"
//             >
//               Edit Product
//             </Link>

//             <Link
//               to="/admin/delete-product"
//               className="rounded-2xl bg-white/15 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/25"
//             >
//               Delete Product
//             </Link>
//           </div>
//         </div>

//         <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
//           <div className="rounded-3xl border border-[#eadfcb] bg-white p-6 shadow-md dark:border-[#2d4a63] dark:bg-[#132033]">
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               Total Products
//             </p>
//             <h3 className="mt-2 text-3xl font-extrabold text-[#1e3a5f] dark:text-[#f8e7b0]">
//               {totalProducts}
//             </h3>
//           </div>

//           <div className="rounded-3xl border border-[#eadfcb] bg-white p-6 shadow-md dark:border-[#2d4a63] dark:bg-[#132033]">
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               Featured Products
//             </p>
//             <h3 className="mt-2 text-3xl font-extrabold text-[#1e3a5f] dark:text-[#f8e7b0]">
//               {featuredProducts}
//             </h3>
//           </div>

//           <div className="rounded-3xl border border-[#eadfcb] bg-white p-6 shadow-md dark:border-[#2d4a63] dark:bg-[#132033]">
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               Low Stock
//             </p>
//             <h3 className="mt-2 text-3xl font-extrabold text-[#1e3a5f] dark:text-[#f8e7b0]">
//               {lowStockProducts}
//             </h3>
//           </div>

//           <div className="rounded-3xl border border-[#eadfcb] bg-white p-6 shadow-md dark:border-[#2d4a63] dark:bg-[#132033]">
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               Categories
//             </p>
//             <h3 className="mt-2 text-3xl font-extrabold text-[#1e3a5f] dark:text-[#f8e7b0]">
//               {uniqueCategories}
//             </h3>
//           </div>
//         </div>

//         {loading ? (
//           <LoadingSpinner />
//         ) : error ? (
//           <EmptyState
//             title="Something went wrong"
//             description="We couldn’t load products."
//           />
//         ) : products.length === 0 ? (
//           <EmptyState
//             title="No products yet"
//             description="Add some products first to see them here."
//           />
//         ) : (
//           <div className="overflow-hidden rounded-3xl border border-[#eadfcb] bg-white p-6 shadow-md dark:border-[#2d4a63] dark:bg-[#132033]">
//             <div className="mb-5 flex items-center justify-between">
//               <div>
//                 <h2 className="text-2xl font-bold text-[#1e3a5f] dark:text-[#f8e7b0]">
//                   Products Overview
//                 </h2>
//                 <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
//                   Search and monitor all products from one place
//                 </p>
//               </div>
//             </div>

//             <div className="mb-6">
//               <input
//                 type="text"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search by name, category, or price..."
//                 className="w-full rounded-2xl border border-gray-300 px-4 py-3 shadow-sm outline-none focus:border-[#1e3a5f] dark:border-[#35526b] dark:bg-[#102038] dark:text-white"
//               />
//             </div>

//             <div className="overflow-x-auto">
//               <table className="w-full text-left text-sm">
//                 <thead className="bg-[#f7f1e7] text-[#1e3a5f] dark:bg-[#102038] dark:text-[#35c6c6]">
//                   <tr>
//                     <th className="px-4 py-3">ID</th>
//                     <th className="px-4 py-3">Image</th>
//                     <th className="px-4 py-3">Name</th>
//                     <th className="px-4 py-3">Category</th>
//                     <th className="px-4 py-3">Price</th>
//                     <th className="px-4 py-3">Stock</th>
//                     <th className="px-4 py-3">Featured</th>
//                     <th className="px-4 py-3">Actions</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {filteredProducts.map((product) => (
//                     <tr
//                       key={product.id}
//                       className="border-t border-[#eadfcb] text-[#1f2937] dark:border-[#2d4a63] dark:text-white"
//                     >
//                       <td className="px-4 py-3">{product.id}</td>

//                       <td className="px-4 py-3">
//                         <img
//                           src={getImageUrl(product.image)}
//                           alt={product.name_en}
//                           className="h-16 w-16 rounded-lg bg-white object-contain"
//                         />
//                       </td>

//                       <td className="px-4 py-3 font-semibold">
//                         {product.name_en}
//                       </td>

//                       <td className="px-4 py-3">
//                         {product.category?.name_en || "—"}
//                       </td>

//                       <td className="px-4 py-3">
//                         ${product.discount_price || product.price}
//                       </td>

//                       <td className="px-4 py-3">{product.stock}</td>

//                       <td className="px-4 py-3">
//                         {product.is_featured ? "✅" : "—"}
//                       </td>

//                       <td className="px-4 py-3">
//                         <button
//                           onClick={() => openDetailsModal(product)}
//                           className="rounded-xl bg-[#1e3a5f] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#16304f] dark:bg-[#35c6c6] dark:text-[#0f172a] dark:hover:bg-[#24b2b2]"
//                         >
//                           View
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>

//       {showDetailsModal && selectedProduct && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
//           <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl dark:bg-[#132033]">
//             <div className="flex items-start justify-between gap-4">
//               <div>
//                 <h2 className="text-3xl font-extrabold text-[#1e3a5f] dark:text-[#f8e7b0]">
//                   {selectedProduct.name_en}
//                 </h2>
//                 <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
//                   {selectedProduct.name_ar}
//                 </p>
//               </div>

//               <button
//                 onClick={() => {
//                   setShowDetailsModal(false);
//                   setSelectedProduct(null);
//                 }}
//                 className="rounded-xl border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-[#35526b] dark:text-white dark:hover:bg-[#102038]"
//               >
//                 Close
//               </button>
//             </div>

//             <div className="mt-6 grid gap-6 md:grid-cols-2">
//               <div className="rounded-2xl bg-[#f8f5ef] p-4 dark:bg-[#102038]">
//                 <img
//                   src={getImageUrl(selectedProduct.image)}
//                   alt={selectedProduct.name_en}
//                   className="h-72 w-full rounded-2xl bg-white object-contain"
//                 />
//               </div>

//               <div className="grid gap-3">
//                 <div className="rounded-2xl bg-[#f8f5ef] p-4 dark:bg-[#102038]">
//                   <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
//                     Category
//                   </p>
//                   <p className="mt-1 text-base font-bold text-[#1e3a5f] dark:text-white">
//                     {selectedProduct.category?.name_en || "—"}
//                   </p>
//                 </div>

//                 <div className="rounded-2xl bg-[#f8f5ef] p-4 dark:bg-[#102038]">
//                   <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
//                     Price
//                   </p>
//                   <p className="mt-1 text-base font-bold text-[#1e3a5f] dark:text-white">
//                     ${selectedProduct.discount_price || selectedProduct.price}
//                   </p>
//                 </div>

//                 <div className="rounded-2xl bg-[#f8f5ef] p-4 dark:bg-[#102038]">
//                   <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
//                     Stock
//                   </p>
//                   <p className="mt-1 text-base font-bold text-[#1e3a5f] dark:text-white">
//                     {selectedProduct.stock}
//                   </p>
//                 </div>

//                 <div className="rounded-2xl bg-[#f8f5ef] p-4 dark:bg-[#102038]">
//                   <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
//                     Rating
//                   </p>
//                   <p className="mt-1 text-base font-bold text-[#1e3a5f] dark:text-white">
//                     {selectedProduct.rating}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-6 grid gap-4">
//               <div className="rounded-2xl bg-[#f8f5ef] p-4 dark:bg-[#102038]">
//                 <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
//                   English Description
//                 </p>
//                 <p className="mt-2 text-sm leading-7 text-gray-700 dark:text-gray-200">
//                   {selectedProduct.description_en}
//                 </p>
//               </div>

//               <div className="rounded-2xl bg-[#f8f5ef] p-4 dark:bg-[#102038]">
//                 <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
//                   Arabic Description
//                 </p>
//                 <p className="mt-2 text-sm leading-7 text-gray-700 dark:text-gray-200">
//                   {selectedProduct.description_ar}
//                 </p>
//               </div>

//               <div className="grid gap-4 md:grid-cols-3">
//                 <div className="rounded-2xl bg-[#f8f5ef] p-4 dark:bg-[#102038]">
//                   <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
//                     Material
//                   </p>
//                   <p className="mt-1 text-sm font-semibold text-[#1e3a5f] dark:text-white">
//                     {selectedProduct.material || "—"}
//                   </p>
//                 </div>

//                 <div className="rounded-2xl bg-[#f8f5ef] p-4 dark:bg-[#102038]">
//                   <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
//                     Color
//                   </p>
//                   <p className="mt-1 text-sm font-semibold text-[#1e3a5f] dark:text-white">
//                     {selectedProduct.color || "—"}
//                   </p>
//                 </div>

//                 <div className="rounded-2xl bg-[#f8f5ef] p-4 dark:bg-[#102038]">
//                   <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
//                     Dimensions
//                   </p>
//                   <p className="mt-1 text-sm font-semibold text-[#1e3a5f] dark:text-white">
//                     {selectedProduct.dimensions || "—"}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex flex-wrap gap-3">
//                 <span className="rounded-full bg-[#1e3a5f] px-4 py-2 text-xs font-bold text-white dark:bg-[#35c6c6] dark:text-[#0f172a]">
//                   {selectedProduct.is_featured ? "Featured" : "Not Featured"}
//                 </span>

//                 <span className="rounded-full bg-[#c89b3c] px-4 py-2 text-xs font-bold text-white">
//                   {selectedProduct.is_antique ? "Antique" : "Regular"}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <Footer />
//     </div>
//   );
// }

// export default AdminDashboard;


