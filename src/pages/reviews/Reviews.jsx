// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { FaArrowLeft } from "react-icons/fa";

// const Reviews = () => {
//   const navigate = useNavigate();

//   // Dummy reviews data with image and user profile picture
//   const reviews = [
//     {
//       id: 1,
//       user: "John Doe",
//       rating: 4.5,
//       comment: "Great product! Fast delivery and excellent quality.",
//       date: "2024-06-01",
//       userImage: "https://i.pravatar.cc/?img=14", // User profile image
//       itemImage: "https://i.pravatar.cc/?img=14", // Item image
//     },
//     {
//       id: 2,
//       user: "Jane Smith",
//       rating: 5,
//       comment: "Absolutely loved it! Will definitely buy again.",
//       date: "2024-06-05",
//       userImage: "https://i.pravatar.cc/?img=14",
//       itemImage: "https://i.pravatar.cc/?img=14",
//     },
//     {
//       id: 3,
//       user: "Mike Johnson",
//       rating: 3,
//       comment: "Good, but could be better. Packaging was damaged.",
//       date: "2024-06-10",
//       userImage: "https://i.pravatar.cc/?img=14",
//       itemImage: "https://i.pravatar.cc/?img=14",
//     },
//     {
//       id: 4,
//       user: "Sarah Lee",
//       rating: 4,
//       comment: "Very satisfied with the purchase. Highly recommended!",
//       date: "2024-06-15",
//       userImage: "https://i.pravatar.cc/?img=14",
//       itemImage: "https://i.pravatar.cc/?img=14",
//     },
//   ];

//   return (
//     <div className="h-auto w-full flex justify-center p-6 overflow-auto text-black">
//       <div className="w-full bg-white rounded-lg border border-1 overflow-y-auto shadow-lg">
//         {/* Back Button */}
//         <div className="p-6 border-b border-gray-200 flex items-center">
//           <FaArrowLeft
//             className="text-gray-600 cursor-pointer"
//             onClick={() => navigate(-1)}
//           />
//           <h1 className="ml-4 text-2xl font-semibold text-gray-800">All Reviews</h1>
//         </div>

//         {/* Reviews List */}
//         <div className="p-6 space-y-6">
//           {reviews.map((review) => (
//             <div key={review.id} className="border-b border-gray-200 pb-6 flex space-x-6">
//               {/* User Profile and Review */}
//               <div className="flex space-x-4 w-full">
//                 {/* User Profile Picture */}
//                 <img
//                   src={review.userImage}
//                   alt={review.user}
//                   className="w-12 h-12 rounded-full object-cover"
//                 />

//                 <div className="flex flex-col justify-between w-full space-y-0">
//                   {/* User Name and Rating */}
//                   <div className="flex justify-between items-center">
//                     <span className="font-semibold text-lg">{review.user}</span>
//                     <span className="text-yellow-500 text-lg">⭐ {review.rating}</span>
//                   </div>

//                   {/* Review Text */}
//                   <p className="text-sm text-gray-600">{review.comment}</p>

//                   {/* Review Date */}
//                   <p className="text-xs text-gray-400">{review.date}</p>
//                 </div>
//               </div>

//               {/* Item Image */}
//               <img
//                 src={review.itemImage}
//                 alt="Item"
//                 className="w-24 h-24 object-cover rounded-md shadow-md"
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Reviews;



import React from "react";
import { FaStar } from "react-icons/fa";

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      user: "Mike Smith",
      rating: 5,
      comment:
        "Amazing product. I booked on Monday and I got my order on the next day. I'm highly impressed with their services. Highly recommended!",
      location: "Toronto, Canada",
      price: "$40.00",
      userImage: "https://i.pravatar.cc/40?img=1",
      itemImage: "https://source.unsplash.com/100x100/?nature",
    },
    {
      id: 2,
      user: "Mike Smith",
      rating: 5,
      comment:
        "Amazing product. I booked on Monday and I got my order on the next day. I'm highly impressed with their services. Highly recommended!",
      location: "Toronto, Canada",
      price: "$40.00",
      userImage: "https://i.pravatar.cc/40?img=2",
      itemImage: "https://source.unsplash.com/100x100/?food",
    },
    {
      id: 3,
      user: "Mike Smith",
      rating: 5,
      comment:
        "Amazing product. I booked on Monday and I got my order on the next day. I'm highly impressed with their services. Highly recommended!",
      location: "Toronto, Canada",
      price: "$40.00",
      userImage: "https://i.pravatar.cc/40?img=3",
      itemImage: "https://source.unsplash.com/100x100/?tech",
    },
  ];

  return (
    <div className="w-full mx-auto p-4 overflow-auto text-black">
      {/* Overall Review Summary */}
      <div className="bg-white p-4 rounded-lg border mb-4">
        <h2 className="text-lg font-semibold">Customer Reviews</h2>
        <div className="flex items-center space-x-1 text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} />
          ))}
          <span className="text-gray-600 text-sm">(4) 24</span>
        </div>
        <div className="mt-2 space-y-1">
          {[18, 8, 9, 6, 2].map((count, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="text-sm">{5 - index} stars</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${(count / 18) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-4 rounded-lg border">
            <div className="flex items-start space-x-4">
              <img
                src={review.itemImage}
                alt="Item"
                className="w-16 h-16 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="font-semibold">Item name</h3>
                <p className="text-sm text-gray-500">{review.location}</p>
                <p className="font-semibold text-green-600">{review.price}</p>
              </div>
            </div>
            <div className="mt-2 flex items-center space-x-1 text-yellow-500">
              {[...Array(review.rating)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <p className="text-sm text-gray-700 mt-2">{review.comment}</p>
            <div className="mt-2 flex items-center space-x-2">
              <img
                src={review.userImage}
                alt={review.user}
                className="w-8 h-8 rounded-full object-cover"
              />
              <p className="text-sm font-semibold">{review.user}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;