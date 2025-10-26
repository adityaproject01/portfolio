import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import adminSubSubCatCss from "./adminSubSubSubCategory.module.css";
import axios from "axios";

const AdminSubSubSubCategory = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Modal states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Add states
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [subSubCategoryId, setSubSubCategoryId] = useState("");

  // Edit states
  const [editId, setEditId] = useState("");
  const [editName, setEditName] = useState("");
  const [editImage, setEditImage] = useState(null);
  const [editCategoryId, setEditCategoryId] = useState("");
  const [editSubCategoryId, setEditSubCategoryId] = useState("");
  const [editSubSubCategoryId, setEditSubSubCategoryId] = useState("");

  // Dropdown options
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [subSubSubCategories, setSubSubSubCategories] = useState([]);

  // Fetch all data initially
  useEffect(() => {
    fetchAll();
  }, []);

  // Fetch dependent dropdowns on change
  useEffect(() => {
    if (categoryId) fetchSubCategories(categoryId);
  }, [categoryId]);

  useEffect(() => {
    if (subCategoryId) fetchSubSubCategories(subCategoryId);
  }, [subCategoryId]);

  useEffect(() => {
    if (editCategoryId) fetchSubCategories(editCategoryId);
  }, [editCategoryId]);

  useEffect(() => {
    if (editSubCategoryId) fetchSubSubCategories(editSubCategoryId);
  }, [editSubCategoryId]);

  // Fetch all categories and subcategories
  const fetchAll = async () => {
    try {
      const [sssRes, ssRes, sRes, cRes] = await Promise.all([
        axios.get("https://ecommercebackend-1-fwcd.onrender.com/api/subsubsubcategory"),
        axios.get("https://ecommercebackend-1-fwcd.onrender.com/api/subsubcategory"),
        axios.get("https://ecommercebackend-1-fwcd.onrender.com/api/subcategories"),
        axios.get("https://ecommercebackend-1-fwcd.onrender.com/api/category", {
          headers: { Authorization: token },
        }),
      ]);

      setSubSubSubCategories(sssRes.data);
      setSubSubCategories(ssRes.data);
      setSubCategories(sRes.data);
      setCategories(cRes.data);
    } catch (error) {
      console.log("Fetch error", error);
    }
  };

  const fetchSubCategories = async (catId) => {
    try {
      const res = await axios.get(
        `https://ecommercebackend-1-fwcd.onrender.com/api/subcategories/category/${catId}`,
        { headers: { Authorization: token } }
      );
      setSubCategories(res.data);
    } catch (err) {
      console.log("SubCategory fetch error", err);
    }
  };

  const fetchSubSubCategories = async (subCatId) => {
    try {
      const res = await axios.get(
        `https://ecommercebackend-1-fwcd.onrender.com/api/subsubcategory/subcategory/${subCatId}`,
        { headers: { Authorization: token } }
      );
      setSubSubCategories(res.data);
    } catch (err) {
      console.log("SubSubCategory fetch error", err);
    }
  };

  // Add new sub-sub-sub-category
  const handleAdd = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("subsubcategory_id", subSubCategoryId);

    try {
      await axios.post(
        "https://ecommercebackend-1-fwcd.onrender.com/api/subsubsubcategory/add",
        formData,
        { headers: { "Content-Type": "multipart/form-data", Authorization: token } }
      );
      alert("Sub-sub-sub-category added successfully");
      fetchAll();
      closeModal();
    } catch (error) {
      console.log("Add error", error.response?.data || error.message);
    }
  };

  // Edit existing sub-sub-sub-category
  const handleEdit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", editName);
    formData.append("subsubcategory_id", editSubSubCategoryId);
    if (editImage) formData.append("image", editImage);

    try {
      await axios.put(
        `https://ecommercebackend-1-fwcd.onrender.com/api/subsubsubcategory/${editId}`,
        formData,
        { headers: { Authorization: token } }
      );
      fetchAll();
      setIsEditOpen(false);
    } catch (err) {
      console.log("Edit error", err.response?.data || err.message);
    }
  };

  // Open edit modal and populate values
  const handleEditClick = async (item) => {
    setEditId(item.id);
    setEditName(item.name);
    setEditSubSubCategoryId(item.sub_subcategory_id);

    // Fetch SubSub parent
    const subSubRes = await axios.get(
      `https://ecommercebackend-1-fwcd.onrender.com/api/subsubcategory/${item.sub_subcategory_id}`,
      { headers: { Authorization: token } }
    );
    const subSub = subSubRes.data;
    setEditSubCategoryId(subSub.subcategory_id);

    // Fetch SubCategory parent
    const subRes = await axios.get(
      `https://ecommercebackend-1-fwcd.onrender.com/api/subcategories/${subSub.subcategory_id}`,
      { headers: { Authorization: token } }
    );
    const sub = subRes.data;
    setEditCategoryId(sub.category_id);

    // Fetch dropdown options
    fetchSubCategories(sub.category_id);
    fetchSubSubCategories(sub.subcategory_id);

    setIsEditOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://ecommercebackend-1-fwcd.onrender.com/api/subsubsubcategory/${id}`,
        { headers: { Authorization: token } }
      );
      fetchAll();
    } catch (error) {
      console.log("Delete error", error);
    }
  };

  const closeModal = () => {
    setIsAddOpen(false);
    setName("");
    setImage(null);
    setCategoryId("");
    setSubCategoryId("");
    setSubSubCategoryId("");
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/ecommerce/home");
  };

  return (
    <div className={adminSubSubCatCss.adminContainer}>
      {/* Navbar */}
      <div className={adminSubSubCatCss.glassNavbar}>
        <button onClick={() => navigate("/ecommerce/admin")} className={adminSubSubCatCss.navBtn}>Home</button>
        <div className={adminSubSubCatCss.navTitle}>Sub-Sub-Sub-Categories</div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button onClick={() => setIsAddOpen(true)} className={`${adminSubSubCatCss.navBtn} ${adminSubSubCatCss.addBtn}`}>Add</button>
          <button onClick={logout} className={`${adminSubSubCatCss.navBtn} ${adminSubSubCatCss.logout}`}>🔓 Logout</button>
        </div>
      </div>

      <h2 className={adminSubSubCatCss.glassHeader}>Manage Sub-Sub-Sub-Categories</h2>
      <Outlet />

      {/* Add Modal */}
      {isAddOpen && (
        <div className={adminSubSubCatCss.modalBackdrop}>
          <div className={`${adminSubSubCatCss.modalContainer} ${adminSubSubCatCss.glassCard}`}>
            <h3>Add Sub-Sub-Sub-Category</h3>
            <form onSubmit={handleAdd}>
              <label>Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

              <label>Category</label>
              <select className={adminSubSubCatCss.modalContainers} value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                <option value="" disabled>Select Category</option>
                {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
              </select>

              <label>SubCategory</label>
              <select className={adminSubSubCatCss.modalContainers} value={subCategoryId} onChange={(e) => setSubCategoryId(e.target.value)}>
                <option value="" disabled>Select SubCategory</option>
                {subCategories.map(sub => <option key={sub.subcategory_id} value={sub.subcategory_id}>{sub.subcategory_name}</option>)}
              </select>

              <label>SubSubCategory</label>
              <select className={adminSubSubCatCss.modalContainers} value={subSubCategoryId} onChange={(e) => setSubSubCategoryId(e.target.value)}>
                <option value="" disabled>Select SubSubCategory</option>
                {subSubCategories.map(ss => <option key={ss.subsub_id} value={ss.subsub_id}>{ss.subsub_name}</option>)}
              </select>

              <label>Image</label>
              <input type="file" onChange={(e) => setImage(e.target.files[0])} />

              <button type="submit" className={adminSubSubCatCss.saveBtn}>Submit</button>
              <button type="button" onClick={closeModal} className={adminSubSubCatCss.cancelBtn}>Close</button>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className={`${adminSubSubCatCss.tableHeader} ${adminSubSubCatCss.glassRow}`}>
        <div>ID</div>
        <div>Name</div>
        <div>Image</div>
        <div>Actions</div>
      </div>
      {subSubSubCategories.map((item, index) => (
        <div key={index} className={adminSubSubCatCss.glassRow}>
          <div>{index + 1}</div>
          <div>{item.name}</div>
          <div><img src={item.image_url} alt="subsubsub" className={adminSubSubCatCss.rowImage} /></div>
          <div className={adminSubSubCatCss.catActions}>
            <button onClick={() => handleEditClick(item)} className={adminSubSubCatCss.editBtn}>Edit</button>
            <button onClick={() => handleDelete(item.id)} className={adminSubSubCatCss.deleteBtn}>Delete</button>
          </div>
        </div>
      ))}

      {/* Edit Modal */}
      {isEditOpen && (
        <div className={adminSubSubCatCss.modalBackdrop}>
          <div className={`${adminSubSubCatCss.modalContainer} ${adminSubSubCatCss.glassCard}`}>
            <h3>Edit Sub-Sub-Sub-Category</h3>
            <form onSubmit={handleEdit}>
              <label>Name</label>
              <input type="text"   value={editName} onChange={(e) => setEditName(e.target.value)} />

              <label>Category</label>
              <select className={adminSubSubCatCss.modalContainers} value={editCategoryId} onChange={(e) => setEditCategoryId(e.target.value)}>
                <option value="" disabled>Select Category</option>
                {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
              </select>

              <label>SubCategory</label>
              <select className={adminSubSubCatCss.modalContainers} value={editSubCategoryId} onChange={(e) => setEditSubCategoryId(e.target.value)}>
                <option value="" disabled>Select SubCategory</option>
                {subCategories.map(sub => <option key={sub.subcategory_id} value={sub.subcategory_id}>{sub.subcategory_name}</option>)}
              </select>

              <label>SubSubCategory</label>
              <select className={adminSubSubCatCss.modalContainers} value={editSubSubCategoryId} onChange={(e) => setEditSubSubCategoryId(e.target.value)}>
                <option value="" disabled>Select SubSubCategory</option>
                {subSubCategories.map(ss => <option key={ss.subsub_id} value={ss.subsub_id}>{ss.subsub_name}</option>)}
              </select>

              <label>Image</label>
              <input type="file" onChange={(e) => setEditImage(e.target.files[0])} />

              <button type="submit" className={adminSubSubCatCss.saveBtn}>Save</button>
              <button type="button" onClick={() => setIsEditOpen(false)} className={adminSubSubCatCss.cancelBtn}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSubSubSubCategory;
