import React, { useContext } from "react";
import GooglePayButton from "../Components/Google Pay/GooglePayButton";
import { ShopContext } from "../Context/ShopContext";
import "./CSS/Checkout.css"


const Checkout = () => {
  const { getTotalCartAmount, clearCart } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();

  const handlePaymentAuthorized = (paymentData) => {
    // Here, send paymentData.paymentMethodData.tokenizationData.token to your backend
    // for actual payment processing with your payment gateway
    console.log("Payment Success:", paymentData);

    alert("Payment successful!");
    clearCart();
  };

  return (
    <div className="checkout-page">
        <h2>Checkout</h2>
        <p>Total to pay: ₹{totalAmount}</p>
    <div className="google-pay-container">
    <GooglePayButton totalPrice={totalAmount} onPaymentAuthorized={handlePaymentAuthorized} />
    </div>
    </div>

  );
};

export default Checkout;
