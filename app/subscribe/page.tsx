"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SubscribePage() {
  const router = useRouter();

  useEffect(() => {
    const script = document.createElement("script");
    // Replace YOUR_SANDBOX_CLIENT_ID with your actual PayPal Sandbox Client ID
    script.src = "https://www.paypal.com/sdk/js?client-id=YOUR_SANDBOX_CLIENT_ID&vault=true&intent=subscription";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if ((window as any).paypal) {
        (window as any).paypal.Buttons({
          createSubscription: function (data: any, actions: any) {
            // Replace YOUR_PAYPAL_PLAN_ID with your actual PayPal Subscription Plan ID
            return actions.subscription.create({
              plan_id: "YOUR_PAYPAL_PLAN_ID",
            });
          },
          onApprove: function (data: any, actions: any) {
            // Payment was approved, you can call your API to verify and update membership
            console.log("Subscription completed with ID:", data.subscriptionID);
            fetch("/api/paypal/subscription", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ subscriptionID: data.subscriptionID }),
            })
              .then((res) => {
                if (res.ok) {
                  router.push("/dashboard");
                } else {
                  console.error("Subscription verification failed");
                }
              })
              .catch((err) => {
                console.error("Error verifying subscription:", err);
              });
          },
          onError: function (err: any) {
            console.error("PayPal error:", err);
          }
        }).render("#paypal-button-container");
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [router]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Subscribe for Premium Access</h1>
      <div id="paypal-button-container"></div>
    </main>
  );
}
