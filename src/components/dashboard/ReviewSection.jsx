// import React, { useState, useEffect, useRef } from "react";
// import { FaStar, FaRegStar } from "react-icons/fa";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import axios from "../../axios"; // Assuming axios is configured
// import { Logo } from "../../assets/export";

// const ReviewSection = () => {
//   const [reviews, setReviews] = useState([]); // Store reviews data
//   const [loading, setLoading] = useState(true); // Loading state
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const startX = useRef(0);
//   const isDragging = useRef(false);

//   // Initialize navigate
//   const navigate = useNavigate();

//   // Fetch reviews from API
//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await axios.get("dispensary/get-item-reviews"); // Adjust the API endpoint as needed
//         if (response?.data?.success) {
//           setReviews(response?.data?.data?.reviews); // Setting the reviews data
//         }
//       } catch (error) {
//         console.error("Error fetching reviews:", error);
//       } finally {
//         setLoading(false); // Set loading to false when done
//       }
//     };

//     fetchReviews();
//   }, []);

//   // Function to move to the next review (3 at a time)
//   const nextReview = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex + 3 >= reviews.length ? 0 : prevIndex + 3
//     );
//   };

//   // Function to move to the previous review (3 at a time)
//   const prevReview = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex - 3 < 0 ? reviews?.length - 3 : prevIndex - 3
//     );
//   };

//   // Function to render star ratings
//   const renderStars = (rating) => {
//     return Array.from({ length: 5 }, (_, i) =>
//       i < rating ? (
//         <FaStar key={i} className="text-yellow-500" />
//       ) : (
//         <FaRegStar key={i} className="text-gray-400" />
//       )
//     );
//   };

//   // Auto slide every 3 seconds
//   useEffect(() => {
//     const interval = setInterval(nextReview, 3000); // Change review every 3 seconds
//     return () => clearInterval(interval);
//   }, []);

//   // Handle mouse down (start of drag)
//   const handleMouseDown = (e) => {
//     isDragging.current = true;
//     startX.current = e.clientX;
//   };

//   // Handle mouse move (dragging)
//   const handleMouseMove = (e) => {
//     if (!isDragging.current) return;
//     const distance = startX.current - e.clientX;
//     if (distance > 100) {
//       nextReview();
//       isDragging.current = false;
//     } else if (distance < -100) {
//       prevReview();
//       isDragging.current = false;
//     }
//   };

//   // Handle mouse up (end of drag)
//   const handleMouseUp = () => {
//     isDragging.current = false;
//   };

//   // Handle touch start (start of touch)
//   const handleTouchStart = (e) => {
//     isDragging.current = true;
//     startX.current = e.touches[0].clientX;
//   };

//   // Handle touch move (touching)
//   const handleTouchMove = (e) => {
//     if (!isDragging.current) return;
//     const distance = startX.current - e.touches[0].clientX;
//     if (distance > 100) {
//       nextReview();
//       isDragging.current = false;
//     } else if (distance < -100) {
//       prevReview();
//       isDragging.current = false;
//     }
//   };

//   // Handle touch end (end of touch)
//   const handleTouchEnd = () => {
//     isDragging.current = false;
//   };

//   // Loading Spinner or Reviews Display
//   if (loading) {
//     return (
//       <div className="w-full p-4 text-center">
//         <div className="spinner"></div> {/* Loading spinner */}
//       </div>
//     );
//   }

//   return (
//     <div className="w-full">
//       {/* Header */}
//       <div className="w-full flex justify-between items-center mb-4">
//         <h1 className="text-black text-3xl font-bold ml-2">Reviews</h1>
//         {/* "See all" button to navigate to /reviews */}
//         <button
//           className="text-green-600 font-medium hover:underline"
//           onClick={() => navigate("/reviews")} // Navigate to /reviews
//         >
//           See all
//         </button>
//       </div>

//       {/* Review Card Slider */}
//       <div
//         className="relative overflow-hidden"
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//         onTouchStart={handleTouchStart}
//         onTouchMove={handleTouchMove}
//         onTouchEnd={handleTouchEnd}
//       >
//         <div
//           className="flex transition-transform duration-500 ease-in-out"
//           style={{ transform: `translateX(-${currentIndex * 33.3333}%)` }}
//         >
//           {/* Render Three Reviews */}
//           {reviews.map((review) => (
//             <div key={review?._id} className="flex-shrink-0 w-1/3 px-2">
//               <div className="bg-gray-50 p-6 rounded-lg border space-y-4">
//                 {/* Product Info */}
//                 <div className="flex items-center space-x-4">
//                   <img
//                     src={
//                       review?.productImage?.length > 0
//                         ? review.productImage[0]
//                         : Logo
//                     }
//                     alt="Product"
//                     className="w-14 h-14 rounded-lg object-cover bg-green-600"
//                   />
//                   <div className="flex-1">
//                     <h3 className="text-lg font-semibold text-black">
//                       {review?.productName}
//                     </h3>
//                     <p className="text-xs text-gray-500">{`${review?.city}, ${review?.state}`}</p>
//                   </div>
//                   <span className="text-green-600 font-semibold text-lg">
//                     ${review?.productPrice}
//                   </span>
//                 </div>

//                 {/* Star Rating */}
//                 <div className="flex">{renderStars(review?.ratingNumber)}</div>

//                 <div className="flex items-center space-x-3">
//                   <img
//                     src={review?.userProfilePicture} // User profile picture
//                     alt="User"
//                     className="w-10 h-10 rounded-full object-cover"
//                   />
//                   <span className="text-sm font-medium text-black">
//                     {review?.userFullName}
//                   </span>
//                 </div>

//                 {/* Review Text */}
//                 <p className="text-sm text-gray-700">{review?.review}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Dots Navigation */}
//       <div className="flex justify-center space-x-3 mt-4">
//         {Array.from({ length: Math.ceil(reviews?.length / 3) }).map(
//           (_, index) => (
//             <div
//               key={index}
//               onClick={() => setCurrentIndex(index * 3)}
//               className={`w-4 h-4 rounded-full cursor-pointer transition-all duration-300 transform ${
//                 index * 3 === currentIndex
//                   ? "bg-green-600 scale-110"
//                   : "bg-gray-300"
//               }`}
//             ></div>
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default ReviewSection;

import React, { useState, useEffect, useRef } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "../../axios"; // Assuming axios is configured
import { Logo } from "../../assets/export";

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]); // Store reviews data
  const [loading, setLoading] = useState(true); // Loading state
  const [currentIndex, setCurrentIndex] = useState(0);
  const startX = useRef(0);
  const isDragging = useRef(false);

  // Initialize navigate
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("dispensary/get-item-reviews"); // Adjust the API endpoint as needed
        if (response?.data?.success) {
          setReviews(response?.data?.data?.reviews); // Setting the reviews data
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const nextReview = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 3 >= reviews?.length ? 0 : prevIndex + 3
    );
  };

  const prevReview = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 3 < 0 ? reviews?.length - 3 : prevIndex - 3
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) =>
      i < rating ? (
        <FaStar key={i} className="text-yellow-500" />
      ) : (
        <FaRegStar key={i} className="text-gray-400" />
      )
    );
  };

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(nextReview, 3000); // Change review every 3 seconds
    return () => clearInterval(interval);
  }, []);

  // Handle mouse down (start of drag)
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;
  };

  // Handle mouse move (dragging)
  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const distance = startX.current - e.clientX;
    if (distance > 100) {
      nextReview();
      isDragging.current = false;
    } else if (distance < -100) {
      prevReview();
      isDragging.current = false;
    }
  };

  // Handle mouse up (end of drag)
  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Handle touch start (start of touch)
  const handleTouchStart = (e) => {
    isDragging.current = true;
    startX.current = e.touches[0].clientX;
  };

  // Handle touch move (touching)
  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    const distance = startX.current - e.touches[0].clientX;
    if (distance > 100) {
      nextReview();
      isDragging.current = false;
    } else if (distance < -100) {
      prevReview();
      isDragging.current = false;
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  if (loading) {
    return (
      <div className="w-full p-4 text-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (reviews?.length === 0) {
    return (
      <div className="w-full p-4 text-center">
        <p className=" text-gray-500">
          No reviews yet! As customers complete their orders, their feedback
          will show up here.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-center mb-4">
        <h1 className="text-black text-3xl font-bold ml-2">Reviews</h1>
        <button
          className="text-green-600 font-medium hover:underline"
          onClick={() => navigate("/reviews")}
        >
          See all
        </button>
      </div>

      <div
        className="relative overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 33.3333}%)` }}
        >
          {reviews?.map((review) => (
            <div key={review?._id} className="flex-shrink-0 w-1/3 px-2">
              <div className="bg-gray-50 p-6 rounded-lg border space-y-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={
                      review?.productImage?.length > 0
                        ? review?.productImage[0]
                        : Logo
                    }
                    alt="Product"
                    className="w-14 h-14 rounded-lg object-cover bg-green-600"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-black">
                      {review?.productName}
                    </h3>
                    <p className="text-xs text-gray-500">{`${review?.city}, ${review?.state}`}</p>
                  </div>
                  <span className="text-green-600 font-semibold text-lg">
                    ${review?.productPrice}
                  </span>
                </div>

                {/* Star Rating */}
                <div className="flex">{renderStars(review?.ratingNumber)}</div>

                <div className="flex items-center space-x-3">
                  <img
                    src={review?.userProfilePicture} // User profile picture
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium text-black">
                    {review?.userFullName}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-sm text-gray-700">{review?.review}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center space-x-3 mt-4">
        {Array.from({ length: Math.ceil(reviews?.length / 3) }).map(
          (_, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index * 3)}
              className={`w-4 h-4 rounded-full cursor-pointer transition-all duration-300 transform ${
                index * 3 === currentIndex
                  ? "bg-green-600 scale-110"
                  : "bg-gray-300"
              }`}
            ></div>
          )
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
