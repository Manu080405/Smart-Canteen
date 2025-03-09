import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./UpdateProduct.css";
import upload_area from "../Assets/upload_area.svg";
import { backend_url } from "../../App";

const UpdateProduct = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${backend_url}/getproduct/${id}`);
        const data = await response.json();
        if (data.success) {
          setProductDetails(data.product);
        } else {
          alert("Failed to fetch product details");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const updateProduct = async () => {
    let updatedProduct = { ...productDetails };

    if (image) {
      let formData = new FormData();
      formData.append("product", image);

      try {
        const uploadResponse = await fetch(`${backend_url}/upload`, {
          method: "POST",
          body: formData,
        }).then((resp) => resp.json());

        if (uploadResponse.success) {
          updatedProduct.image = uploadResponse.image_url;
        } else {
          alert("Image upload failed");
          return; // Stop execution if upload fails
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Image upload error");
        return;
      }
    }

    try {
      const response = await fetch(`${backend_url}/updateproduct/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      }).then((resp) => resp.json());

      if (response.success) {
        alert("Product Updated Successfully!");
      } else {
        alert("Update Failed");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Update error");
    }
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="updateproduct">
      <h2>Update Product</h2>
      <div className="updateproduct-itemfield">
        <p>Product Title</p>
        <input type="text" name="name" value={productDetails.name} onChange={changeHandler} placeholder="Type here" />
      </div>
      <div className="updateproduct-itemfield">
        <p>Product Description</p>
        <input type="text" name="description" value={productDetails.description} onChange={changeHandler} placeholder="Type here" />
      </div>
      <div className="updateproduct-price">
        <div className="updateproduct-itemfield">
          <p>Price</p>
          <input type="number" name="old_price" value={productDetails.old_price} onChange={changeHandler} placeholder="Type here" />
        </div>
        <div className="updateproduct-itemfield">
          <p>Offer Price</p>
          <input type="number" name="new_price" value={productDetails.new_price} onChange={changeHandler} placeholder="Type here" />
        </div>
      </div>
      <div className="updateproduct-itemfield">
        <p>Product Category</p>
        <select value={productDetails.category} name="category" className="update-product-selector" onChange={changeHandler}>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="updateproduct-itemfield">
        <p>Product Image</p>
        <label htmlFor="file-input">
          <img 
            className="updateproduct-thumbnail-img" 
            src={image ? URL.createObjectURL(image) : productDetails.image || upload_area} 
            alt="Product" 
            onError={(e) => e.target.src = upload_area} // Fallback if image fails
          />
        </label>
        <input onChange={(e) => setImage(e.target.files[0])} type="file" name="image" id="file-input" accept="image/*" hidden />
      </div>
      <button className="updateproduct-btn" onClick={updateProduct}>UPDATE</button>
    </div>
  );
};

export default UpdateProduct;