import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import prodCss from "./adminProd.module.css";
import deleteImg from "../../../images/banner/delete1.png";
import editImg from "../../../images/banner/edit-button_7124470.png";
import axios from "axios";

const AdminProduct = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [productDetails, setProductDetails] = useState([]);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productSubCategory, setProductSubCategory] = useState("");
  const [productSubSubCategory, setProductSubSubCategory] = useState("");
  const [productSubSubSubCategory, setProductSubSubSubCategory] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productDescription, setProductDescription] = useState("");

  const [getCategoryDetails, setGetCategoryDetails] = useState([]);
  const [getSubCategoryDetails, setGetSubCategoryDetails] = useState([]);
  const [getSubSubCategoryDetails, setGetSubSubCategoryDetails] = useState([]);
  const [getSubSubSubCategoryDetails, setGetSubSubSubCategoryDetails] =
    useState([]);

  const logoutButton = () => {
    localStorage.removeItem("token");
    navigate("/ecommerce/home");
  };

  const fetchProducts = useCallback(() => {
    axios
      .get(
        "http://ecommercebackend-1-fwcd.onrender.com/api/products/allProducts",
        {
          headers: { Authorization: token },
        }
      )
      .then((res) => setProductDetails(res.data.products))
      .catch((err) => console.log("Fetch my-products error", err));
  }, [token]);

  const fetchCategories = useCallback(() => {
    axios
      .get("http://ecommercebackend-1-fwcd.onrender.com/api/category")
      .then((res) => setGetCategoryDetails(res.data))
      .catch((err) => console.log("Fetch category error", err));
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  useEffect(() => {
    if (productCategory) fetchSubCategories(productCategory);
    else setGetSubCategoryDetails([]);
  }, [productCategory]);

  useEffect(() => {
    if (productSubCategory) fetchSubSubCategories(productSubCategory);
    else setGetSubSubCategoryDetails([]);
  }, [productSubCategory]);

  useEffect(() => {
    if (productSubSubCategory) fetchSubSubSubCategories(productSubSubCategory);
    else setGetSubSubSubCategoryDetails([]);
  }, [productSubSubCategory]);

  const fetchSubCategories = (categoryId) => {
    axios
      .get(
        `http://ecommercebackend-1-fwcd.onrender.com/api/subcategories/category/${categoryId}`
      )
      .then((res) => setGetSubCategoryDetails(res.data))
      .catch((err) => setGetSubCategoryDetails([]));
  };

  const fetchSubSubCategories = (subcategoryId) => {
    axios
      .get(
        `http://ecommercebackend-1-fwcd.onrender.com/api/subsubcategory/subcategory/${subcategoryId}`
      )
      .then((res) => setGetSubSubCategoryDetails(res.data))
      .catch((err) => setGetSubSubCategoryDetails([]));
  };

  const fetchSubSubSubCategories = (subSubcategoryId) => {
    axios
      .get(
        `http://ecommercebackend-1-fwcd.onrender.com/api/subsubsubcategory/subsubcategory/${subSubcategoryId}`
      )
      .then((res) => setGetSubSubSubCategoryDetails(res.data))
      .catch((err) => setGetSubSubSubCategoryDetails([]));
  };

  const productDelete = (productId) => {
    axios
      .delete(
        `http://ecommercebackend-1-fwcd.onrender.com/api/products/${productId}`,
        {
          headers: { Authorization: token },
        }
      )
      .then(() => fetchProducts())
      .catch((err) => console.log("DeleteError", err));
  };

  const handlEditProduct = async (e, productId) => {
    e.preventDefault();
    if (!productSubSubSubCategory) {
      alert("Please select a SubSubSubCategory.");
      return;
    }

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", productPrice);
    formData.append("quantity", productQuantity);
    formData.append("sub_sub_subcategory_id", productSubSubSubCategory);
    formData.append("description", productDescription);
    if (productImage) formData.append("image", productImage);

    try {
      await axios.put(
        `http://ecommercebackend-1-fwcd.onrender.com/api/products/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      fetchProducts();
      closeModal();
    } catch (error) {
      console.log("errorEdit", error);
    }
  };

  const closeModal = () => {
    setIsEditing(false);
    setCurrentEditId(null);
    setProductName("");
    setProductPrice("");
    setProductQuantity("");
    setProductCategory("");
    setProductSubCategory("");
    setProductSubSubCategory("");
    setProductSubSubSubCategory("");
    setProductImage(null);
    setProductDescription("");
  };

  return (
    <div className={prodCss.adminContainer}>
      <nav className={prodCss.glassNavbar}>
        <button className={prodCss.navBtn} onClick={() => navigate("/admin")}>
          Home
        </button>
        <div className={prodCss.navTitle}>Welcome, Admin</div>
        <button className={prodCss.navBtn} onClick={logoutButton}>
          Logout
        </button>
      </nav>

      {/* Edit Modal */}
      {isEditing && (
        <div className={prodCss.modalBackdrop}>
          <div className={`${prodCss.modalContainer} ${prodCss.glassCard}`}>
            <h2>Edit Product</h2>
            <form onSubmit={(e) => handlEditProduct(e, currentEditId)}>
              {/* Form fields (same as before) */}
              {/* ... (input fields remain unchanged) */}
              <button type="submit">Update</button>
              <button type="button" onClick={closeModal}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Product Table */}
      <div className={prodCss.sellerGlassCard}>
        <div className={prodCss.scrollWrapper}>
          <div className={prodCss.product}>
            <div className={prodCss.productDetails}>SlNo</div>
            <div className={prodCss.productDetails}>Name</div>
            <div className={prodCss.productDetails}>Price</div>
            <div className={prodCss.productDetails}>Quantity</div>
            <div className={prodCss.productDetails}>Image</div>
            <div className={prodCss.productDetails}>Description</div>
            <div className={prodCss.productDetails}>Actions</div>
          </div>

          {productDetails.map((product, index) => (
            <div className={prodCss.product} key={index}>
              <p className={prodCss.productDetails}>{index + 1}</p>
              <p className={prodCss.productDetails}>{product.name}</p>
              <p className={prodCss.productDetails}>{product.price}</p>
              <p className={prodCss.productDetails}>{product.quantity}</p>
              <p className={prodCss.productDetails}>
                <img src={product.image_url} alt="product" height="100" />
              </p>
              <p className={prodCss.productDetailsDescription}>
                {product.description}
              </p>
              <p className={prodCss.productDetails}>
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setCurrentEditId(product.id);
                  }}>
                  <img src={editImg} alt="edit" />
                </button>
                <button onClick={() => productDelete(product.id)}>
                  <img src={deleteImg} alt="delete" />
                </button>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;
