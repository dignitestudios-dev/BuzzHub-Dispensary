import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import axios from "../../axios"; // Assuming you have axios setup
import { Logo } from "../../assets/export";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewSummary, setReviewSummary] = useState({
    totalReviews: 0,
    averageRating: 0,
    ratings: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    },
  });

  // Fetch reviews on component mount (without productId)
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("dispensary/get-item-reviews"); // No productId passed here
        if (response.data.success) {
          setReviews(response.data.data.reviews);
          setReviewSummary({
            totalReviews: response.data.data.totalReviews,
            averageRating: response.data.data.averageRating,
            ratings: response.data.data.ratings,
          });
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false); // Set loading to false when the request completes
      }
    };

    fetchReviews();
  }, []); // Empty dependency array means this effect runs only once, when the component mounts

  if (loading) {
    return (
      <div className="w-full mt-2 flex justify-center items-center">
        <div className="spinner"></div> {/* Loading spinner */}
      </div>
    );
  }

  // Helper function to calculate percentage width for review bars
  const getReviewBarWidth = (rating) => {
    return (rating / reviewSummary.totalReviews) * 100;
  };

  return (
    <div className="w-full mx-auto p-4 overflow-auto text-black mb-16">
      {/* Overall Review Summary */}
      <div className="bg-gray-50 p-4 rounded-lg border mb-4">
        <h2 className="text-lg font-semibold">Customer Reviews</h2>
        <div className="flex items-center space-x-1 text-yellow-500">
          {[...Array(Math.floor(reviewSummary.averageRating))].map((_, i) => (
            <FaStar key={i} />
          ))}
          <span className="text-gray-600 text-sm">
            ({reviewSummary.totalReviews} reviews) | Average:{" "}
            {reviewSummary.averageRating}
          </span>
        </div>

        {/* Rating distribution bars */}
        <div className="mt-2 space-y-1">
          {[5, 4, 3, 2, 1].map((starRating) => (
            <div key={starRating} className="flex items-center space-x-2">
              <span className="text-sm">{starRating} stars</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{
                    width: `${getReviewBarWidth(
                      reviewSummary.ratings[starRating]
                    )}%`,
                  }}
                ></div>
              </div>
              <span className="text-sm text-gray-600">
                {reviewSummary.ratings[starRating]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review._id} className="bg-gray-50 p-4 rounded-lg border">
            <div className="flex items-start space-x-4">
              <img
                src={
                  review?.productImage?.length > 0
                    ? review.productImage[0]
                    : Logo
                }
                alt="Item"
                className="w-16 h-16 object-cover rounded-md bg-green-600"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{review?.productName}</h3>
                <p className="text-sm text-gray-500">
                  {review.city}, {review.state}
                </p>
                <p className="font-semibold text-green-600">
                  ${review.productPrice}
                </p>
              </div>
            </div>

            {/* Add a fallback for invalid ratingNumber */}
            <div className="mt-2 flex items-center space-x-1 text-yellow-500">
              {[...Array(Math.max(0, Math.floor(review.ratingNumber)))].map(
                (_, i) => (
                  <FaStar key={i} />
                )
              )}
            </div>

            <p className="text-sm text-gray-700 mt-2">{review.review}</p>
            <div className="mt-2 flex items-center space-x-2">
              <img
                src={review.userProfilePicture}
                alt={review.userFullName}
                className="w-8 h-8 rounded-full object-cover"
              />
              <p className="text-sm font-semibold">{review.userFullName}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
