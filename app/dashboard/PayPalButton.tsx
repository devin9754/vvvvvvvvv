"use client";

import React from "react";

export default function PayPalButton() {
  // The snippet from PayPal (including the <style> and <form>)
  const paypalHtml = `
    <style>
      .pp-QCX6CM548NXDN {
        text-align: center;
        border: none;
        border-radius: 0.25rem;
        min-width: 11.625rem;
        padding: 0 2rem;
        height: 2.625rem;
        font-weight: bold;
        background-color: #FFD140;
        color: #000000;
        font-family: "Helvetica Neue", Arial, sans-serif;
        font-size: 1rem;
        line-height: 1.25rem;
        cursor: pointer;
      }
    </style>
    <form
      action="https://www.paypal.com/ncp/payment/QCX6CM548NXDN"
      method="post"
      target="_blank"
      style="display: inline-grid; justify-items: center; align-content: start; gap: 0.5rem;"
    >
      <input class="pp-QCX6CM548NXDN" type="submit" value="Pay Now" />
      <img src="https://www.paypalobjects.com/images/Debit_Credit_APM.svg" alt="cards" />
      <section>
        Powered by
        <img
          src="https://www.paypalobjects.com/paypal-ui/logos/svg/paypal-wordmark-color.svg"
          alt="paypal"
          style="height: 0.875rem; vertical-align: middle;"
        />
      </section>
    </form>
  `;

  return (
    <div
      dangerouslySetInnerHTML={{ __html: paypalHtml }}
    />
  );
}
