import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import axios from "../../axios";

const ItemDetails = () => {
  const { orderId } = useParams(); 
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const fetchProductDetails = async () => {
    try {
      const response = await axios?.post(`dispensary/get-product-by-id`, { productId: orderId } 
      );
      
      if (response.data.success) {
        const productData = response.data.data.products;
        const reviewsData = response.data.data.reviews;
        
        setProduct(productData);
        setReviews(reviewsData);
      }
    } catch (error) {
      console.error("Error fetching product details", error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [orderId]); 

  const nextReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      prevIndex === reviews.length - 3 ? 0 : prevIndex + 1
    );
  };

  const prevReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 3 : prevIndex - 1
    );
  };

  if (!product) {
    return (
      <div className="w-full mt-4 flex justify-center items-center">
        <div className="spinner"></div> {/* Loading spinner */}
      </div>
    );
  }

  return (
    <div className="h-auto w-full bg-gray-100 flex justify-center p-6 overflow-auto text-black">
      <div className="w-full h-screen bg-white rounded-lg shadow-lg">
        {/* Back Button */}
        <div className="p-6 border-b border-gray-200 flex items-center">
          <FaArrowLeft
            className="text-gray-600 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1 className="ml-4 text-2xl font-semibold text-gray-800">Product Details</h1>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <img
              src={product?.productImage[0]} 
              alt={product?.productName}
              className="w-full h-96 object-cover rounded-lg shadow-md"
            />

            <div>
              <h2 className="text-3xl font-bold mb-4">{product?.productName}</h2>
              <p className="text-xl font-semibold text-gray-700 mb-2">
                ${product?.productPrice} / {product?.weightQuantity} {product?.weightType}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                {product?.productType} ({product?.subTypes.join(", ")})
              </p>
              <p className="text-gray-600 mb-4">{product?.productDescription}</p>
              <p className="text-red-600 font-semibold mb-4">
                Expiry Date: {new Date(product?.expiryDate).toLocaleDateString()}
              </p>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Warnings and Additional Information:</h3>
              <p className="text-sm text-gray-600">{product?.warningDescription}</p>
            </div>
          </div>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <h3 className="text-2xl font-bold mb-4">Reviews</h3>
            <div className="relative">
              {/* Review Slider */}
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={prevReview}
                  className="text-gray-600 hover:text-gray-800 font-bold text-lg"
                >
                  &#10094;
                </button>

                {/* Display multiple reviews in a row */}
                <div className="flex w-full overflow-hidden ">
                  <div
                    className="flex transition-transform duration-500"
                    style={{
                      transform: `translateX(-${currentReviewIndex * 33.33}%)`,
                    }}
                  >
                    {reviews.map((review, index) => (
                      <div
                        key={index}
                        className="flex-shrink-0 w-1/3 p-4 bg-gray-50 border border-gray-200 rounded-lg flex items-start space-x-4 mr-6"
                      >
                        <div>
                          <p className="text-xs text-gray-600 mb-2">{review?.review}</p>
                          <div className="flex items-center space-x-1 text-yellow-500">
                            {Array.from({ length: review?.ratingNumber }, (_, i) => (
                              <AiFillStar key={i} />
                            ))}
                          </div>
                          <p className="text-xs text-gray-800 font-semibold mt-2">{product?.productPrice}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={nextReview}
                  className="text-gray-600 hover:text-gray-800 font-bold text-lg"
                >
                  &#10095;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
