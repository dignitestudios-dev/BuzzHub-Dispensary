import React, { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";

const AddProductModal = ({ onClose }) => {
  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files.map(file => URL.createObjectURL(file))]);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        {/* Close (X) button in top right corner */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-xl text-black hover:text-gray-800"
        >
          <FaTimes />
        </button>

        <h1 className="text-lg font-semibold mb-1">Upload Product</h1>
        <div className="flex gap-2 mb-4">
          {images.map((src, index) => (
            <div key={index} className="w-16 h-16 bg-gray-200 rounded overflow-hidden relative">
              <img src={src} alt="Uploaded" className="w-full h-full object-cover" />
            </div>
          ))}
          <label className="w-16 h-16 flex items-center justify-center bg-green-600 text-white rounded cursor-pointer">
            <FaPlus />
            <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
          </label>
        </div>
        <div className="grid gap-4">
          <input type="text" placeholder="Name" className="w-full p-2 border rounded" />
          <input type="number" placeholder="Amount" className="w-full p-2 border rounded" />
          <input type="date" className="w-full p-2 border rounded" />
          <select className="w-full p-2 border rounded">
            <option>Main Category</option>
          </select>
          <select className="w-full p-2 border rounded">
            <option>Sub Category</option>
          </select>
          <input type="text" placeholder="Enter Gram" className="w-full p-2 border rounded" />
          <textarea placeholder="Product Details" className="w-full p-2 border rounded"></textarea>
          <textarea placeholder="Warning & additional information" className="w-full p-2 border rounded"></textarea>
          <button className="w-full bg-green-600 text-white p-2 rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
