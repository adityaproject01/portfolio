import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
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
  const [getSubSubSubCategoryDetails, setGetSubSubSubCategoryDetails] = useState([]);

  useEffect(() => {
    // ✅ Fetch products inline to avoid eslint warning
    axios
      .get(
        "http://ecommercebackend-1-fwcd.onrender.com/api/products/allProducts",
        {
          headers: { Authorization: token },
        }
      )
      .then((res) => setProductDetails(res.data.products))
      .catch((err) => console.log("Fetch my-products error", err));

    fetchCategories();
  }, []);

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

  const logoutButton = () => {
    localStorage.removeItem("token");
    navigate("/ecommerce/home");
  };

  const fetchCategories = () => {
    axios
      .get("http://ecommercebackend-1-fwcd.onrender.com/api/category")
      .then((res) => setGetCategoryDetails(res.data))
      .catch((err) => console.log("Fetch category error", err));
  };

  const fetchSubCategories = (categoryId) => {
    axios
      .get(
        `http://ecommercebackend-1-fwcd.onrender.com/api/subcategories/category/${categoryId}`
      )
      .then((res) => setGetSubCategoryDetails(res.data))
      .catch((err) => {
        console.error("Failed to fetch subcategories", err);
        setGetSubCategoryDetails([]);
      });
  };

  const fetchSubSubCategories = (subcategoryId) => {
    axios
      .get(
        `http://ecommercebackend-1-fwcd.onrender.com/api/subsubcategory/subcategory/${subcategoryId}`
      )
      .then((res) => setGetSubSubCategoryDetails(res.data))
      .catch((err) => {
        console.error("Failed to fetch sub-subcategories", err);
        setGetSubSubCategoryDetails([]);
      });
  };

  const fetchSubSubSubCategories = (subSubcategoryId) => {
    axios
      .get(
        `http://ecommercebackend-1-fwcd.onrender.com/api/subsubsubcategory/subsubcategory/${subSubcategoryId}`
      )
      .then((res) => setGetSubSubSubCategoryDetails(res.data))
      .catch((err) => {
        console.error("Failed to fetch sub-sub-subcategories", err);
        setGetSubSubSubCategoryDetails([]);
      });
  };

  const productDelete = (productId) => {
    axios
      .delete(
        `http://ecommercebackend-1-fwcd.onrender.com/api/products/${productId}`,
        {
          headers: { Authorization: token },
        }
      )
      .then(() => window.location.reload())
      .catch((err) => console.log("DeleteError", err));
  };

  const handleAddProduct = async (e) => {
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
    formData.append("image", productImage);

    try {
      await axios.post(
        "http://ecommercebackend-1-fwcd.onrender.com/api/products/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleEditProduct = async (e, productId) => {
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
      window.location.reload();
    } catch (error) {
      console.log("errorEdit", error);
    }
  };

  const openAddModal = () => {
    closeModal(); // Clear previous state
    setIsEditing(true);
  };

  const openEditModal = (product) => {
    setIsEditing(true);
    setCurrentEditId(product.id);
    setProductName(product.name);
    setProductPrice(product.price);
    setProductQuantity(product.quantity);
    setProductCategory(product.category_id || "");
    setProductSubCategory(product.subcategory_id || "");
    setProductSubSubCategory(product.subsub_id || "");
    setProductSubSubSubCategory(product.subsubsub_id || "");
    setProductDescription(product.description);
    setProductImage(null);
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
      <Outlet />
      <nav className={prodCss.glassNavbar}>
        <button className={prodCss.navBtn} onClick={() => navigate("/admin")}>
          Home
        </button>
        <div className={prodCss.navTitle}>Welcome, Admin</div>
        <button className={prodCss.navBtn} onClick={logoutButton}>
          Logout
        </button>
      </nav>

      <button className={prodCss.navBtn} onClick={openAddModal}>
        + Add Product
      </button>

      {isEditing && (
        <div className={prodCss.modalBackdrop}>
          <div className={`${prodCss.modalContainer} ${prodCss.glassCard}`}>
            <div className={prodCss.adminCatModalBody}>
              <h2>{currentEditId ? "Edit Product" : "Add Product"}</h2>
            </div>
            <div className={prodCss.productForm}>
              <form
                onSubmit={(e) => {
                  currentEditId
                    ? handleEditProduct(e, currentEditId)
                    : handleAddProduct(e);
                }}>
                <div className={prodCss.productField}>
                  <label>Name</label>
                  <input
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                  />
                </div>
                <div className={prodCss.productField}>
                  <label>Price</label>
                  <input
                    type="number"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    required
                  />
                </div>
                <div className={prodCss.productField}>
                  <label>Quantity</label>
                  <input
                    type="number"
                    value={productQuantity}
                    onChange={(e) => setProductQuantity(e.target.value)}
                    required
                  />
                </div>
                <div className={prodCss.productField}>
                  <label>Category</label>
                  <select
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    required>
                    <option value="">Select Category</option>
                    {getCategoryDetails.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={prodCss.productField}>
                  <label>SubCategory</label>
                  <select
                    value={productSubCategory}
                    onChange={(e) => setProductSubCategory(e.target.value)}
                    required>
                    <option value="">Select SubCategory</option>
                    {getSubCategoryDetails.map((sub) => (
                      <option
                        key={sub.subcategory_id}
                        value={sub.subcategory_id}>
                        {sub.subcategory_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={prodCss.productField}>
                  <label>SubSubCategory</label>
                  <select
                    value={productSubSubCategory}
                    onChange={(e) => setProductSubSubCategory(e.target.value)}
                    required>
                    <option value="">Select SubSubCategory</option>
                    {getSubSubCategoryDetails.map((sub) => (
                      <option key={sub.subsub_id} value={sub.subsub_id}>
                        {sub.subsub_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={prodCss.productField}>
                  <label>SubSubSubCategory</label>
                  <select
                    value={productSubSubSubCategory}
                    onChange={(e) =>
                      setProductSubSubSubCategory(e.target.value)
                    }
                    required>
                    <option value="">Select SubSubSubCategory</option>
                    {getSubSubSubCategoryDetails.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={prodCss.productField}>
                  <label>Image</label>
                  <input
                    type="file"
                    onChange={(e) => setProductImage(e.target.files[0])}
                    accept="image/*"
                    required={!currentEditId}
                  />
                </div>
                <div className={prodCss.productField}>
                  <label>Description</label>
                  <input
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    required
                  />
                </div>
                <div className={prodCss.productField}>
                  <button className={prodCss.btn} type="submit">
                    {currentEditId ? "Update" : "Add"}
                  </button>
                  <button
                    className={prodCss.btn}
                    onClick={closeModal}
                    type="button">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

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
            <div className={prodCss.product} key={product.id}>
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
                  className={prodCss.actionButton}
                  onClick={() => openEditModal(product)}>
                  <img src={editImg} alt="edit" />
                </button>
                <button
                  className={prodCss.actionButton}
                  onClick={() => productDelete(product.id)}>
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
