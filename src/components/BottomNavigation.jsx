import React from "react";
import { Link } from "@nextui-org/link";
import { Home, Book, Box } from "lucide-react";
import { Button } from "./ui/button";
export default function BottomNavigation() {
  return (
    <>
      <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 shadow-lg lg:hidden z-50">
        <div className="flex justify-between items-center py-2 px-4 bg-gradient-to-t from-gray-100 to-white">
          <Link
            href="/"
            className="text-center flex-1 flex flex-col items-center"
          >
            <Home className="text-gray-600" size={24} />
            <p className="text-sm text-gray-600 mt-1">Home</p>
          </Link>
          <Link
            href="/plot"
            className="text-center flex-1 flex flex-col items-center"
          >
            <Book className="text-gray-600" size={24} />
            <p className="text-sm text-gray-600 mt-1">Plot</p>
          </Link>
          <Link
            href="/items"
            className="text-center flex-1 flex flex-col items-center"
          >
            <Box className="text-gray-600" size={24} />
            <p className="text-sm text-gray-600 mt-1">Items</p>
          </Link>
        </div>
      </div>
    </>
  );
}
