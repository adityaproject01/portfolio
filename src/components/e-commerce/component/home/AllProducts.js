// src/pages/AllProducts.jsx (or wherever you keep it)
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import NavBars from "../NavBars"; // remove if you don't want the top navbar

const baseUrl = "https://ecommercebackend-1-fwcd.onrender.com";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [categoryFilter] = useState("all");
  const [sortFilter, setSortFilter] = useState("default");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const [toast, setToast] = useState({ open: false, message: "" });

  // 🔹 Fetch all products from your backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/products`, {
          params: {
            limit: 100, // adjust as needed
            page: 1,
          },
        });

        const list = res.data.products || res.data;
        setProducts(list || []);
      } catch (err) {
        console.error("Error loading products:", err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🔹 Filter + sort logic (front-end)
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Filter by category (if your product has .category or .main_category)
    if (categoryFilter !== "all") {
      list = list.filter((p) => {
        const cat = p.category || p.main_category || "";
        return cat.toLowerCase() === categoryFilter.toLowerCase();
      });
    }

    // Sort
    switch (sortFilter) {
      case "price-low":
        list.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-high":
        list.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "name":
        list.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        break;
      default:
        // "default" → do nothing (backend order)
        break;
    }

    return list;
  }, [products, categoryFilter, sortFilter]);

  // 🔹 Toast helper
  const showToast = (message) => {
    setToast({ open: true, message });
    setTimeout(() => {
      setToast((t) => ({ ...t, open: false }));
    }, 3000);
  };

  // 🔹 Add to cart (real backend)
  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("token");

    if (!token) {
      showToast("Please login to add items to cart.");
      return;
    }

    try {
      await axios.post(
        `${baseUrl}/api/cart/add`,
        {
          product_id: product.id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      showToast("Item added to cart!");
    } catch (err) {
      console.error("Add to cart failed:", err);
      showToast("Failed to add to cart.");
    }
  };

  // 🔹 Product details modal
  const openDetails = (product) => {
    setSelectedProduct(product);
    setShowDetailsModal(true);
  };

  const closeDetails = () => {
    setShowDetailsModal(false);
    setSelectedProduct(null);
  };

  // 🔹 Rating helper (your DB doesn't have rating → fallback)
  const getRating = (product) => {
    return product.rating ? Number(product.rating) : 4.5;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white px-4 py-3 rounded-lg shadow border border-gray-200 text-sm text-gray-700">
          Loading products...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white px-4 py-3 rounded-lg shadow border border-red-200 text-sm text-red-700">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Optional global navbar */}
      <NavBars />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            All Products
          </h2>
          <p className="text-gray-600">Discover our amazing collection</p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Category Filter – adjust to match your categories */}
           

            {/* Sort Filter */}
            <div className="w-full md:w-auto">
              <select
                value={sortFilter}
                onChange={(e) => setSortFilter(e.target.value)}
                className="text-black w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="default">Sort By</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div
          id="productsGrid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredProducts.length === 0 ? (
            <p className="text-gray-500 col-span-full text-center">
              No products found.
            </p>
          ) : (
            filteredProducts.map((product) => {
              const rating = getRating(product);
              const fullStars = Math.floor(rating);
              const emptyStars = 5 - fullStars;

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden group">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {/* Optional category badge – uses product.category if available */}
                    {(product.category || product.main_category) && (
                      <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {product.category || product.main_category}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400 text-sm">
                        {"★".repeat(fullStars)}
                        {"☆".repeat(emptyStars)}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        ({rating.toFixed(1)})
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description || "No description available."}
                    </p>

                    {/* Price + Buttons */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-blue-600">
                        ₹{Number(product.price || 0).toFixed(2)}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => openDetails(product)}
                        className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition font-semibold text-sm"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition font-semibold text-sm"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>

      {/* Product Details Modal */}
      {showDetailsModal && selectedProduct && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeDetails();
          }}
        >
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800">
                  Product Details
                </h3>
                <button
                  onClick={closeDetails}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedProduct.image_url}
                    alt={selectedProduct.name}
                    className="w-full rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">
                    {selectedProduct.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400 text-xl">
                      {"★".repeat(Math.floor(getRating(selectedProduct)))}
                      {"☆".repeat(
                        5 - Math.floor(getRating(selectedProduct))
                      )}
                    </div>
                    <span className="ml-2 text-gray-600">
                      ({getRating(selectedProduct).toFixed(1)})
                    </span>
                  </div>

                  {/* Category badge if exists */}
                  {(selectedProduct.category ||
                    selectedProduct.main_category) && (
                    <div className="mb-4">
                      <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {selectedProduct.category ||
                          selectedProduct.main_category}
                      </span>
                    </div>
                  )}

                  <p className="text-gray-700 mb-6">
                    {selectedProduct.description ||
                      "No additional description available."}
                  </p>

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-blue-600">
                      ₹{Number(selectedProduct.price || 0).toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(selectedProduct)}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-lg"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.open && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 text-sm">
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
