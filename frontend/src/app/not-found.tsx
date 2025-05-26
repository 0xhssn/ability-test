"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center space-y-8 max-w-md">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
          className="space-y-6"
        >
          <h1 className="text-8xl font-bold text-gray-900">
            404
          </h1>
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <h2 className="text-2xl font-semibold text-gray-800">
              Page Not Found
            </h2>
            <p className="text-gray-500">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/">
            <Button
              size="lg"
              variant="outline"
              className="border-gray-200 hover:bg-gray-50"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return Home
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-400 text-sm"
        >
          <p>Please check the URL or navigate back to the homepage</p>
        </motion.div>
      </div>
    </div>
  );
} 