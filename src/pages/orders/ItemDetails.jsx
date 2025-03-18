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
    <div className="h-full w-full bg-white flex justify-center p-6 overflow-auto text-black">
      <div className="w-full h-screen bg-white rounded-lg shadow-2xl ">
        {/* Back Button */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center">
            <FaArrowLeft
              className="text-gray-600 cursor-pointer hover:text-indigo-600 transition-all duration-300"
              onClick={() => navigate(-1)}
            />
            <h1 className="ml-4 text-3xl font-semibold text-gray-800">
              Product Details
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
              onClick={() => setIsModalOpen(true)}
            >
              <FaPlus className="mr-2" /> Edit Product
            </button>
            <button
              className="flex items-center px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-all duration-300"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              <FaTrash className="mr-2" /> Delete Product
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="w-full">
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                className="w-full h-80"
              >
                {product?.productImage?.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image}
                      alt={`Product Image ${index}`}
                      className="w-full h-full object-cover rounded-xl shadow-lg transform transition-all hover:scale-105 duration-300"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="text-center md:text-left">
              <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
                {product?.productName}
              </h2>
              <p className="text-xl text-gray-700 mb-2">
                ${product?.productPrice} / {product?.weightQuantity}{" "}
                {product?.weightType}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                {product?.productType} ({product?.subTypes.join(", ")})
              </p>
              <p className="text-gray-600 mb-4">
                {product?.productDescription}
              </p>
              {/* <p className="text-red-600 font-semibold mb-4">
                Expiry Date:{" "}
                {new Date(product?.expiryDate).toLocaleDateString()}
              </p> */}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Warnings and Additional Information:
              </h3>
              <p className="text-sm text-gray-600">
                {product?.warningDescription}
              </p>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-8 border-t border-gray-300 pt-6">
            <h3 className="text-3xl font-bold text-gray-800">Reviews</h3>
            {/* Check if there are reviews */}
            {reviews.length === 0 ? (
              <p className="text-lg text-gray-500 mt-6">
                No reviews available for this product yet.
              </p>
            ) : (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {reviews.map((review, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    {/* Rating */}
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="flex items-center space-x-1 text-yellow-500">
                        {Array.from(
                          { length: review?.ratingNumber },
                          (_, i) => (
                            <AiFillStar key={i} />
                          )
                        )}
                      </div>
                    </div>

                    {/* Review Text */}
                    <p className="text-sm text-gray-700">{review?.review}</p>
                  </div>
                ))}
              </div>
            )}
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
