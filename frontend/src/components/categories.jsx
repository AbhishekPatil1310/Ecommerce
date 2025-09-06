import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const allCategories = [
  "Electronics",
  "Fashion",
  "Home & Kitchen",
  "Books",
  "Sports",
  "Toys",
  "Beauty",
  "Automotive",
  "Music",
  "Pet Supplies",
  "Office Supplies",
];

export default function SidebarCategories({ onCategorySelect }) {
  const [open, setOpen] = useState(false);
  const [randomCategories, setRandomCategories] = useState([]);

  const toggleCategories = () => {
    if (!open) {
      // Generate 5 random categories when opening
      const shuffled = [...allCategories].sort(() => 0.5 - Math.random());
      setRandomCategories(shuffled.slice(0, 5));
    }
    setOpen(!open);
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-lg shadow-md p-3">
      {/* Main Categories button */}
      <button
        onClick={toggleCategories}
        className="flex justify-between items-center w-full px-3 py-2 text-left font-semibold text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
      >
        Categories
        {open ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      {/* Subcategory list */}
      {open && (
        <ul className="mt-2 space-y-1">
          {randomCategories.map((cat, idx) => (
            <li key={idx}>
              <button
                onClick={() => onCategorySelect?.(cat)}
                className="block w-full text-left px-4 py-2 rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow hover:scale-105 transition-transform"
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
