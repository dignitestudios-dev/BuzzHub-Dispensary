import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import axios from "../../axios";
import EditProductModal from "../../components/products/EditProductModal";
import { FaPlus } from "react-icons/fa6";
import DeleteProductModal from "../../components/products/DeleteProductModal";
import { FaTrash } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const ItemDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const fetchProductDetails = async () => {
    try {
      const response = await axios?.post("dispensary/get-product-by-id", {
        productId: orderId,
      });
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

  const handleDeleteProduct = async () => {
    try {
      const response = await axios?.post("dispensary/deleteProduct", {
        productId: orderId,
      });
      if (response.data.success) {
        setIsDeleteModalOpen(false);
        navigate("/products");
      }
    } catch (error) {
      console.error("Error deleting product", error);
      // Handle the error, maybe show an alert
    }
  };

  if (!product) {
    return (
      <div className="w-full mt-4 flex justify-center items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-gray-100 flex justify-center p-6 overflow-auto text-black">
      <div className="w-full h-screen bg-white rounded-lg shadow-lg">
        {/* Back Button */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center">
            <FaArrowLeft
              className="text-gray-600 cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <h1 className="ml-4 text-2xl font-semibold text-gray-800">
              Product Details
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              className="flex items-center px-6 py-3 bg-[#1D7C42] text-white rounded-md shadow-lg hover:bg-green-600 transition-all"
              onClick={() => setIsModalOpen(true)}
            >
              <FaPlus className="mr-2" /> Edit Product
            </button>
            <button
              className="flex items-center px-6 py-3 bg-red-600 text-white rounded-md shadow-lg hover:bg-red-700 transition-all"
              onClick={() => setIsDeleteModalOpen(true)} // Open the delete modal
            >
              <FaTrash className="mr-2" /> Delete Product
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="w-full">
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                className="w-[400px] h-[400px]"
              >
                {product?.productImage?.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image}
                      alt={`Product Image ${index}`}
                      className="w-full h-65 object-cover rounded-lg shadow-md"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4">
                {product?.productName}
              </h2>
              <p className="text-xl font-semibold text-gray-700 mb-2">
                ${product?.productPrice} / {product?.weightQuantity}{" "}
                {product?.weightType}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                {product?.productType} ({product?.subTypes.join(", ")})
              </p>
              <p className="text-gray-600 mb-4">
                {product?.productDescription}
              </p>
              <p className="text-red-600 font-semibold mb-4">
                Expiry Date:{" "}
                {new Date(product?.expiryDate).toLocaleDateString()}
              </p>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Warnings and Additional Information:
              </h3>
              <p className="text-sm text-gray-600">
                {product?.warningDescription}
              </p>
            </div>
          </div>
          {/* Reviews Grid */}
          <div className="mt-8 border-t border-gray-200 ">
            <h3 className="text-2xl font-bold mt-4">Reviews</h3>

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Product Info */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex-1">
                      {/* Star Rating */}
                      <div className="flex items-center space-x-1 text-yellow-500">
                        {Array.from(
                          { length: review?.ratingNumber },
                          (_, i) => (
                            <AiFillStar key={i} />
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  {/* User Info */}
                  {/* <div className="flex items-center space-x-3">
          <img
            src={review?.userProfilePicture} 
            alt="User"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="text-sm font-medium text-gray-800">{review?.userFullName}</span>
        </div> */}

                  {/* Review Text */}
                  <p className="text-sm text-gray-700 mt-2">{review?.review}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <EditProductModal
          onClose={() => setIsModalOpen(false)}
          productData={product}
          orderId={orderId}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteProductModal
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={handleDeleteProduct}
          productName={product?.productName}
        />
      )}
    </div>
  );
};

export default ItemDetails;
