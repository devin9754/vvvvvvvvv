"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-blue-50 text-center">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-4xl w-full"
      >
        <Card className="bg-white shadow-xl p-8">
          <CardContent className="flex flex-col items-center">
            <h1 className="text-4xl font-bold text-blue-800 mb-4">
              Welcome to DigiModels.Store
            </h1>
            <p className="text-lg text-blue-700 mb-6">
              We specialize in comprehensive digital solutions including SaaS,
              website design, hosting, development, refreshes, and SEO/Marketing
              &amp; Sales, specifically serving businesses in Chula Vista and San
              Diego County.
            </p>
            <p className="text-md text-gray-600 mb-6">
              From startups needing a strong digital footprint to established
              businesses enhancing their existing online strategies,
              DigiModels.Store and DigiModels.us deliver tailored solutions to
              elevate your digital presence.
            </p>

            {/* Centered bullet list */}
            <ul className="list-disc list-inside text-blue-700 mb-6 inline-block">
              <li className="mb-2">
                <strong>SaaS Solutions:</strong> Customized software tailored for
                unique business requirements.
              </li>
              <li className="mb-2">
                <strong>Website Design &amp; Development:</strong> Modern,
                responsive, and user-centric websites.
              </li>
              <li className="mb-2">
                <strong>Website Hosting &amp; Refreshes:</strong> Reliable hosting
                with updates to keep your website cutting-edge.
              </li>
              <li className="mb-2">
                <strong>SEO &amp; Marketing:</strong> Targeted strategies for
                increased visibility and business growth.
              </li>
            </ul>

            <p className="text-blue-700 mb-6">
              Contact us at{" "}
              <a
                href="mailto:devin@digimodels.us"
                className="underline text-blue-800"
              >
                devin@digimodels.us
              </a>{" "}
              or call{" "}
              <a href="tel:+16197918817" className="underline text-blue-800">
                (619) 791-8817
              </a>
            </p>

            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-md">
              Get Started
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <motion.video
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1.5 }}
        src="https://digimodels.s3.us-west-1.amazonaws.com/AdobeStock_499549744.mp4"
        className="mt-10 w-full max-w-4xl rounded-xl shadow-2xl"
        autoPlay
        loop
        muted
        playsInline
      />
    </main>
  );
}
