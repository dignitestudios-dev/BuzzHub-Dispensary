import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";

const ItemDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const order = {
    id: "2151515156",
    placedOn: "Sun, Jun 7, 2024",
    time: "11:30 AM",
    fulfillmentMethod: "Delivery",
    status: "Accepted",
    buyer: "Mike Smith",
    shippingAddress: "Unit 305, Montford Court, Montford Street, Salford, M50",
    productDetails: {
      name: "Product Name",
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec semper urna euismod, volutpat neque id, pellentesque erat.`,
      weight: "100 Grams",
      pricePerUnit: "$40.00/Per Gram",
      available: "100 Grams Available",
      expiryDate: "20 Feb, 2024",
      warnings: `This product contains THC/CBD content. Keep out of reach of children. Store in a cool, dry place.`,
      imageUrl: "https://i.pravatar.cc/?img=14", // Replace with actual image path
    },
    billing: {
      subtotal: "$140",
      platformFees: "$10",
      total: "$150",
    },
    reviews: [
      {
        user: "Mike Smith",
        content: `Amazing product`,
        rating: 5,
        price: "$40.00",
      },
      {
        user: "Jane Doe",
        content: `Very good quality. Fast delivery. Would buy again!`,
        rating: 4,
        price: "$40.00",
      },
      {
        user: "Sam Johnson",
        content: `Good quality,`,
        rating: 4,
        price: "$40.00",
      },
      {
        user: "Emily Clark",
        content: `Excellent service and great product.`,
        rating: 5,
        price: "$40.00",
      },
      {
        user: "Chris Adams",
        content: `Quality was okay, but could have been improved.`,
        rating: 3,
        price: "$40.00",
      },
    ],
  };

  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const nextReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      prevIndex === order.reviews.length - 3 ? 0 : prevIndex + 1
    );
  };

  const prevReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      prevIndex === 0 ? order.reviews.length - 3 : prevIndex - 1
    );
  };

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

        {/* Main Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Image */}
            <img
              src={order.productDetails.imageUrl}
              alt={order.productDetails.name}
              className="w-full h-96 object-cover rounded-lg shadow-md"
            />

            {/* Product Information */}
            <div>
              <h2 className="text-3xl font-bold mb-4">{order.productDetails.name}</h2>
              <p className="text-xl font-semibold text-gray-700 mb-2">
                {order.productDetails.pricePerUnit}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                {order.productDetails.available}
              </p>
              <p className="text-gray-600 mb-4">
                {order.productDetails.description}
              </p>
              <p className="text-red-600 font-semibold mb-4">
                Expiry Date: {order.productDetails.expiryDate}
              </p>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Warnings and Additional Information:</h3>
              <p className="text-sm text-gray-600">
                {order.productDetails.warnings}
              </p>
            </div>
          </div>

          {/* Reviews Section with Custom Slider */}
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
                <div className="flex w-full overflow-hidden">
                  <div
                    className="flex transition-transform duration-500"
                    style={{
                      transform: `translateX(-${currentReviewIndex * 33.33}%)`,
                    }}
                  >
                    {order.reviews.map((review, index) => (
                      <div
                        key={index}
                        className="flex-shrink-0 w-1/3 p-4 bg-gray-50 border border-gray-200 rounded-lg flex items-start space-x-4 mr-6"
                      >
                        <div className="w-12 h-12 bg-green-500 text-white flex items-center justify-center rounded-full">
                          {review.user.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-800">{review.user}</h4>
                          <p className="text-xs text-gray-600 mb-2">{review.content}</p>
                          <div className="flex items-center space-x-1 text-yellow-500">
                            {Array.from({ length: review.rating }, (_, i) => (
                              <AiFillStar key={i} />
                            ))}
                          </div>
                          <p className="text-xs text-gray-800 font-semibold mt-2">{review.price}</p>
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
