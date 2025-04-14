import React, { useState, useEffect } from "react";
import axios from "../../axios"; // Adjust the import path if necessary
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AddProductModal from "../../components/products/AddProductModal";
import { Logo } from "../../assets/export";

// Function to display star ratings
const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        className={`${
          i <= rating ? "text-yellow-400" : "text-gray-300"
        } text-xl`}
      >
        &#9733;
      </span>
    );
  }
  return stars;
};

const Products = () => {
  const [products, setProducts] = useState([]); // Initialize products state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [productsPerPage] = useState(12); // Show 10 products per page
  const navigate = useNavigate();

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("dispensary/get-all-products");
        if (response.data.success) {
          setProducts(response.data.data); // Set products data in state
        } else {
          console.error("Failed to fetch products:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleViewDetails = (productId) => {
    navigate(`/item-details/${productId}`);
  };

  // Calculate the current products to display
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="spinner"></div>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white border rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
                >
                  <div className="relative w-full h-64">
                    <img
                      src={product.productImage[0] || Logo} // Use product image or fallback to Logo
                      alt={product.productName}
                      className="w-full h-full object-cover bg-[#1D7C42] rounded-t-lg transition-transform transform hover:scale-110"
                    />
                  </div>
                  <div className="p-6 flex flex-col h-full">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                      {product.productName}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {product.productDescription.length > 30
                        ? product.productDescription.slice(0, 30) + "..."
                        : product.productDescription}
                    </p>
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        {renderStars(product.averageRating)}{" "}
                        {/* Display stars */}
                        <span className="ml-2 text-sm text-gray-500">
                          {product.averageRating} ({product.totalReviews}{" "}
                          reviews)
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-xl font-bold text-[#074F57]">
                        ${product.productPrice}
                      </p>
                      <button
                        onClick={() => handleViewDetails(product._id)} // Pass productId for details
                        className="text-white bg-[#1D7C42] p-2 rounded-md hover:bg-[#195c33] text-sm"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-black">
                Your shelves are empty , time to stock up! 🌿 Add your first
                product and start growing your business today.
              </p> // Show message if no products are available
            )}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-end items-center mt-8 space-x-4">
            {/* Previous Button */}
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-6 py-2 bg-[#1D7C42] text-white rounded-lg hover:bg-[#155e2e] focus:outline-none focus:ring-2 focus:ring-[#074F57] disabled:opacity-50 transition-all duration-200"
            >
              Previous
            </button>

            {/* Current Page */}
            <span className="text-xl text-gray-500 font-semibold">
              Page {currentPage}
            </span>

            {/* Next Button */}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage * productsPerPage >= products.length}
              className="px-6 py-2 bg-[#1D7C42] text-white rounded-lg hover:bg-[#155e2e] focus:outline-none focus:ring-2 focus:ring-[#074F57] disabled:opacity-50 transition-all duration-200"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {isModalOpen && <AddProductModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Products;
