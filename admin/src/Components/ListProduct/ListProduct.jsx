import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from '../Assets/cross_icon.png'
import { backend_url, currency } from "../../App";
import { useNavigate } from "react-router-dom";

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const navigate = useNavigate();

  const updateProduct = (id) => {
    navigate(`/updateproduct/${id}`);
  };

  const fetchInfo = () => {
    fetch(`${backend_url}/allproducts`)
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    await fetch(`${backend_url}/removeproduct`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    });

    fetchInfo();
  };

  return (
    <div className="listproduct">
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p> <p>Title</p> <p> Price</p> <p>Category</p><p>Quantity</p><p>Remove</p><p>Edit</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((e, index) => (
          <div key={index}>
            <div className="listproduct-format-main listproduct-format">
              <img className="listproduct-product-icon" src={backend_url + e.image} alt="" />
              <p className="cartitems-product-title">{e.name}</p>
              <p>{currency}{e.new_price}</p>
              <p>{e.category}</p>
              <p>{e.qty}</p>
              <img
                className="listproduct-remove-icon"
                onClick={() => removeProduct(e._id)}
                src={cross_icon}
                alt=""
              />
              <button onClick={() => updateProduct(e._id)}>Edit</button>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
