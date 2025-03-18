import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Heart } from "lucide-react";
import forbidden from '@/assets/forbidden.png'

export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white-100 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <img
          src={forbidden}
          alt="Cute Teddy Bear"
          style={{ height: '400px', width: '400px'}}
        />
      </motion.div>

      {/* Error Message */}
      <motion.p
        className="text-xl text-blue-500 mt-2 px-6 max-w-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        You are not authorized to access this page! Please return to home page!
      </motion.p>

      {/* Floating Heart Icon */}
      <motion.div
        initial={{ y: -5 }}
        animate={{ y: 5 }}
        transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
        className="mt-6"
      >
        <Heart className="text-blue-500 w-12 h-12" />
      </motion.div>

      {/* Home Button */}
      <Link
        to="/"
        className="mt-6 flex items-center gap-2 px-6 py-3 bg-blue-400 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition"
      >
        <Home className="w-5 h-5" /> Go Home
      </Link>
    </div>
  );
}
