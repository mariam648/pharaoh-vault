import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    localStorage.setItem("isAdmin", "true");
    localStorage.setItem("adminName", formData.name);
    localStorage.setItem("adminEmail", formData.email);

    toast.success("Welcome Administrator");
    navigate("/admin-dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5ef] via-white to-[#f3eadb] dark:from-[#0f172a] dark:via-[#132033] dark:to-[#1a2c44]">
      <Navbar />

      <div className="mx-auto max-w-md px-4 py-12">
        <div className="rounded-3xl border border-[#eadfcb] bg-white p-8 shadow-md dark:border-[#2d4a63] dark:bg-[#132033]">
          <h1 className="mb-2 text-3xl font-extrabold text-[#1e3a5f] dark:text-[#f8e7b0]">
            Login as Administrator
          </h1>

          <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">
            Enter your admin details to access the dashboard
          </p>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Administrator Name"
              className="rounded-2xl border border-gray-300 px-4 py-3 dark:border-[#35526b] dark:bg-[#102038] dark:text-white"
              required
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Administrator Email"
              className="rounded-2xl border border-gray-300 px-4 py-3 dark:border-[#35526b] dark:bg-[#102038] dark:text-white"
              required
            />

            <button
              type="submit"
              className="mt-2 rounded-2xl bg-[#1e3a5f] px-6 py-3 font-semibold text-white transition hover:bg-[#16304f] dark:bg-[#35c6c6] dark:text-[#0f172a] dark:hover:bg-[#24b2b2]"
            >
              Enter Dashboard
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AdminLogin;