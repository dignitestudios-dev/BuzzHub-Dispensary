import React, { useState, useEffect, useRef } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

const ReviewSection = () => {
  const reviews = [
    {
      id: 1,
      user: "Mike Smith",
      rating: 4,
      comment:
        "Amazing product. I booked on Monday and I got my order on the next day. I'm highly impressed with their services. Highly recommended!",
      location: "Toronto, Canada",
      price: "$40.00",
      item: "Item name",
      image: "https://i.pravatar.cc/?img=12",
      userImage: "https://i.pravatar.cc/?img=14",
    },
    {
      id: 2,
      user: "Jane Doe",
      rating: 5,
      comment:
        "Fantastic quality! I was pleasantly surprised by how quickly my order arrived.",
      location: "New York, USA",
      price: "$35.99",
      item: "Premium Product",
      image: "https://i.pravatar.cc/?img=14",
      userImage: "https://i.pravatar.cc/?img=15",
    },
    {
      id: 3,
      user: "John Carter",
      rating: 3,
      comment:
        "Good but could be better. Delivery was slightly delayed, but the product itself is fine.",
      location: "Los Angeles, USA",
      price: "$50.00",
      item: "Limited Edition",
      image: "https://i.pravatar.cc/?img=16",
      userImage: "https://i.pravatar.cc/?img=18",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const startX = useRef(0);
  const isDragging = useRef(false);

  // Function to move to the next review
  const nextReview = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to render star ratings
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

    // Clean up the interval on component unmount
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
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
      );
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
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
      );
      isDragging.current = false;
    }
  };

  // Handle touch end (end of touch)
  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  return (
    <div className="w-full ">
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-2">
      <h1 className="text-black text-3xl font-bold mb-3">Reviews</h1>
      <button className="text-green-600 font-medium hover:underline">
          See all
        </button>
      </div>

      {/* Review Card Slider */}
      <div
        className="flex justify-center items-center w-full"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full border bg-white p-6 rounded-lg  flex flex-col space-y-6 transition-all duration-500 ease-in-out mx-auto">
          {/* Product Info */}
          <div className="flex items-center space-x-4">
            <img
              src={reviews[currentIndex].image}
              alt="Product"
              className="w-14 h-14 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-black">{reviews[currentIndex].item}</h3>
              <p className="text-xs text-gray-500">{reviews[currentIndex].location}</p>
            </div>
            <span className="text-green-600 font-semibold text-lg">
              {reviews[currentIndex].price}
            </span>
          </div>

           {/* Star Rating */}
           <div className="flex">{renderStars(reviews[currentIndex].rating)}</div>
          <div className="flex items-center space-x-3">
            <img
              src={reviews[currentIndex].userImage}
              alt="User"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-sm font-medium text-black">{reviews[currentIndex].user}</span>
          </div>

         

          {/* Review Text */}
          <p className="text-sm text-gray-700 ">{reviews[currentIndex].comment}</p>

          
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center space-x-3 mt-2">
        {reviews.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-4 h-4 rounded-full cursor-pointer transition-all duration-300 transform ${
              index === currentIndex
                ? "bg-green-600 scale-110"
                : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
