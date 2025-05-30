import React, { useEffect } from "react";

const PaymentsClientConstructor = window.google?.payments?.api?.PaymentsClient;

const paymentsClient = PaymentsClientConstructor
  ? new PaymentsClientConstructor({ environment: "TEST" })
  : null;

// rest of your component code


const baseRequest = {
  apiVersion: 2,
  apiVersionMinor: 0,
};

const allowedCardNetworks = ["VISA", "MASTERCARD"];
const allowedCardAuthMethods = ["PAN_ONLY", "CRYPTOGRAM_3DS"];

const tokenizationSpecification = {
  type: "PAYMENT_GATEWAY",
  parameters: {
    gateway: "example", // Replace with your payment gateway, eg. 'stripe'
    gatewayMerchantId: "exampleGatewayMerchantId",
  },
};

const baseCardPaymentMethod = {
  type: "CARD",
  parameters: {
    allowedAuthMethods: allowedCardAuthMethods,
    allowedCardNetworks: allowedCardNetworks,
  },
};

const cardPaymentMethod = {
  ...baseCardPaymentMethod,
  tokenizationSpecification: tokenizationSpecification,
};

const GooglePayButton = ({ totalPrice, onPaymentAuthorized }) => {
  useEffect(() => {
    if (!paymentsClient) {
      console.error("Google Pay API not loaded.");
      return;
    }

    paymentsClient
      .isReadyToPay({
        ...baseRequest,
        allowedPaymentMethods: [baseCardPaymentMethod],
      })
      .then((response) => {
        if (response.result) {
          addGooglePayButton();
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const addGooglePayButton = () => {
    const button = paymentsClient.createButton({
      onClick: onGooglePayButtonClicked,
      buttonColor: "black",
      buttonType: "pay",
    });
    const container = document.getElementById("google-pay-button-container");
    if (container && !container.hasChildNodes()) {
      container.appendChild(button);
    }
  };

  const onGooglePayButtonClicked = () => {
    const paymentDataRequest = {
      ...baseRequest,
      allowedPaymentMethods: [cardPaymentMethod],
      transactionInfo: {
        totalPriceStatus: "FINAL",
        totalPrice: totalPrice.toFixed(2),
        currencyCode: "INR",
      },
      merchantInfo: {
        merchantId: "01234567890123456789", // Replace with your merchant ID
        merchantName: "Your Merchant Name",
      },
    };

    paymentsClient
      .loadPaymentData(paymentDataRequest)
      .then((paymentData) => {
        // Payment successful, send paymentData to your backend for processing
        onPaymentAuthorized(paymentData);
      })
      .catch((err) => {
        console.error("Payment failed", err);
        alert("Payment failed or cancelled.");
      });
  };

  return <div id="google-pay-button-container"></div>;
};

export default GooglePayButton;
