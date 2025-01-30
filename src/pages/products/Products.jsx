import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AddProductModal from "../../components/products/AddProductModal";
import { Logo } from "../../assets/export";

const products = [
  { name: "Product 1", description: "This is product 1", price: "$100", imageUrl: "https://via.placeholder.com/300" },
  { name: "Product 2", description: "This is product 2", price: "$200", imageUrl: "https://via.placeholder.com/300" },
  { name: "Product 3", description: "This is product 3", price: "$150", imageUrl: "https://via.placeholder.com/300" },
];

const Products = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = () => {
    navigate("/item-details");  // Just navigate to the item-details page
  };

  return (
    <div className="w-full p-8 overflow-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-black text-3xl font-bold">Products</h1>
        <button
          className="flex items-center px-6 py-3 bg-[#1D7C42] text-white rounded-md shadow-lg hover:bg-green-600 transition-all"
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus className="mr-2" /> Add Product
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white border rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <div className="relative w-full h-64">
              <img
                src={Logo} // Changed image to Logo as per your example
                alt={product.name}
                className="w-full h-full object-cover bg-[#1D7C42] rounded-t-lg transition-transform transform hover:scale-110"
              />
            </div>
            <div className="p-6 flex flex-col h-full">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <p className="text-xl font-bold text-[#074F57]">{product.price}</p>
                <button
                  onClick={handleViewDetails}  // Just navigate to item-details
                  className="text-white bg-[#1D7C42] p-2 rounded-full hover:bg-[#195c33] text-sm"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && <AddProductModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Products;
