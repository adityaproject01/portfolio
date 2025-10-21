import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";

const baseUrl = "https://ecommercebackend-1-fwcd.onrender.com";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [totalCartCount, setTotalCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/products/`);
      setProducts(res.data.products);
      setFilteredProducts(res.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/category`);
      setCategory(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/cart`, {
        headers: { Authorization: token },
      });
      setTotalCartCount(res.data.length);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchCart();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCategoryFilter = (categoryName) => {
    setSelectedCategory(categoryName);
    if (categoryName === "All") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category === categoryName
      );
      setFilteredProducts(filtered);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  const handleAddToCart = async (productId) => {
    if (!token) {
      navigate("/ecommerce/login");
      return;
    }

    try {
      await axios.post(
        `${baseUrl}/api/cart/add`,
        { productId, quantity: 1 },
        { headers: { Authorization: token } }
      );
      fetchCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className={styles.homeContainer}>
      <header className={styles.header}>
        <h1 className={styles.logo}>ShopEase</h1>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className={styles.cartIcon} onClick={() => navigate("/ecommerce/cart")}>
          🛒 <span>{totalCartCount}</span>
        </div>
      </header>

      <div className={styles.categoryBar}>
        <button
          className={selectedCategory === "All" ? styles.activeCategory : ""}
          onClick={() => handleCategoryFilter("All")}
        >
          All
        </button>
        {category.map((cat) => (
          <button
            key={cat._id}
            className={selectedCategory === cat.name ? styles.activeCategory : ""}
            onClick={() => handleCategoryFilter(cat.name)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className={styles.productsGrid}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className={styles.productCard}>
              <img
                src={product.image_url}
                alt={product.name}
                className={styles.productImage}
              />
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
              <button
                className={styles.addToCartBtn}
                onClick={() => handleAddToCart(product._id)}
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className={styles.noResults}>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
