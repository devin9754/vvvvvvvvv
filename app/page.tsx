"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-sky-100 to-blue-200 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-4xl w-full"
      >
        <Card className="shadow-xl p-8 bg-white/90">
          <CardContent className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-blue-800">
              Welcome to DigiModels.Store
            </h1>
            <p className="text-lg text-gray-600">
              We provide SaaS solutions, Website Development, Hosting, Refreshes, and SEO/Marketing & Sales services in Chula Vista and San Diego County.
            </p>
            <p className="text-md text-gray-500">
              Ready to elevate your online presence? Contact us today!
            </p>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white shadow">
              Get in Touch
            </Button>
            <div className="text-sm text-gray-500">
              Email: <a className="underline" href="mailto:devin@digimodels.us">devin@digimodels.us</a> | Phone: <a className="underline" href="tel:+16197918817">(619) 791-8817</a>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.video
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1.5 }}
        src="https://digimodels.s3.us-west-1.amazonaws.com/AdobeStock_499549744.mp4"
        className="mt-10 rounded-xl shadow-xl w-full max-w-4xl"
        autoPlay
        loop
        muted
        playsInline
      />
    </main>
  );
}
