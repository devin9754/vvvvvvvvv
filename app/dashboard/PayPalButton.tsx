"use client";

import React from "react";

export default function PayPalButton() {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <form
        action="https://www.paypal.com/ncp/payment/QCX6CM548NXDN"
        method="post"
        target="_blank"
        style={{
          display: "inline-grid",
          justifyItems: "center",
          alignContent: "start",
          gap: "0.5rem",
        }}
      >
        <input
          type="submit"
          value="Pay Now"
          style={{
            textAlign: "center",
            border: "none",
            borderRadius: "0.25rem",
            minWidth: "11.625rem",
            padding: "0 2rem",
            height: "2.625rem",
            fontWeight: "bold",
            backgroundColor: "#FFD140",
            color: "#000000",
            fontFamily: '"Helvetica Neue",Arial,sans-serif',
            fontSize: "1rem",
            lineHeight: "1.25rem",
            cursor: "pointer",
          }}
        />
        <img
          src="https://www.paypalobjects.com/images/Debit_Credit_APM.svg"
          alt="cards"
        />
      </form>
    </div>
  );
}
