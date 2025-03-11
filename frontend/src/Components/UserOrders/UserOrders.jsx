import React, { useEffect, useState } from "react";
import "./UserOrders.css";
import { backend_url, currency } from "../../App";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId"); // Ensure userId is stored in localStorage

  useEffect(() => {
    console.log("User ID from localStorage:", userId); // Debugging userId
  
    const fetchOrders = async () => {
      try {
        if (!userId) {
          setError("User not logged in.");
          setLoading(false);
          return;
        }
  
        const response = await fetch(`${backend_url}/userorders/${userId}`);
        const data = await response.json();
  
        console.log("API Response:", data); // Log full response
  
        if (!Array.isArray(data)) {
          throw new Error("Invalid response format. Expected an array.");
        }
  
        setOrders(data);
      } catch (err) {
        setError("Failed to load orders. Please try again later.");
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrders();
  }, [userId]);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!orders.length) return <p>No orders found.</p>;

  return (
    <div className="userorders">
      <h1>Your Orders</h1>
      <div className="userorders-format-main">
        <p>Product</p> <p>Title</p> <p>Price</p> <p>Category</p> <p>Status</p>
      </div>
      <div className="userorders-allorders">
        <hr />
        {orders.map((order, index) => (
          <div key={index}>
            <div className="userorders-format-main userorders-format">
              <img 
                className="userorders-product-icon" 
                src={order.image ? `${backend_url}${order.image}` : "/default-image.jpg"} 
                alt={order.name || "Product Image"} 
              />
              <p className="order-product-title">{order.name || "No title"}</p>
              <p>{currency}{order.price ?? "N/A"}</p>
              <p>{order.category || "Uncategorized"}</p>
              <p className={order.status === "Delivered" ? "status-delivered" : "status-pending"}>
                {order.status || "Pending"}
              </p>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserOrders;
