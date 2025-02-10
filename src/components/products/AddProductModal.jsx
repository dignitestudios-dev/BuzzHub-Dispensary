import React, { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import axios from "../../axios"; // Import axios instance
import { useNavigate } from "react-router-dom";

const allowedSubTypes = [
  "Northern Lights", "Afghan Kush", "Granddaddy Purple (GDP)", "Bubba Kush", "Hindu Kush",
  "Durban Poison", "Sour Diesel", "Jack Herer", "Maui Wowie", "Green Crack", 
  "Blue Dream", "Girl Scout Cookies (GSC)", "OG Kush", "Pineapple Express", "White Widow"
];

const AddProductModal = ({ onClose }) => {
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [warningDescription, setWarningDescription] = useState("");
  const [productType, setProductType] = useState("");
  const [subTypes, setSubTypes] = useState(""); // User input as a string (comma-separated)
  const [weightQuantity, setWeightQuantity] = useState("");
  const [weightType, setWeightType] = useState("");
  const [fullfillmentMethod, setFullfillmentMethod] = useState(""); // New field for fulfillment method
  const [subTypesError, setSubTypesError] = useState("");

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const subTypesArray = subTypes.split(",").map(subType => subType.trim());

    for (const subType of subTypesArray) {
      if (!allowedSubTypes.includes(subType)) {
        setSubTypesError(`"${subType}" is not a valid subtype.`);
        return; 
      }
    }

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("expiryDate", expiryDate);
    formData.append("productDescription", productDescription);
    formData.append("warningDescription", warningDescription);
    formData.append("productType", productType);

    subTypesArray.forEach((subType, index) => {
      formData.append("subTypes[]", subType);
    });

    formData.append("weightQuantity", weightQuantity);
    formData.append("weightType", weightType);
    formData.append("fullfillmentMethod", fullfillmentMethod); 

    images.forEach(image => {
      formData.append("productImage", image);
    });

    try {
      const response = await axios.post("dispensary/add-product", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        console.log("Product added successfully:", response.data.data);
        onClose();
        navigate("/products"); 
      } else {
        console.error("Failed to add product:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-auto">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-xl text-black hover:text-gray-800"
        >
          <FaTimes />
        </button>

        <h1 className="text-lg font-semibold mb-4">Upload Product</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-2 mb-4">
            {images.length > 0 && images.map((image, index) => (
              <div key={index} className="w-16 h-16 bg-gray-200 rounded overflow-hidden relative">
                <img src={URL.createObjectURL(image)} alt="Uploaded" className="w-full h-full object-cover" />
              </div>
            ))}
            <label className="w-16 h-16 flex items-center justify-center bg-green-600 text-white rounded cursor-pointer">
              <FaPlus />
              <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
            </label>
          </div>

          {/* Form fields */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input 
              type="text" 
              placeholder="Name" 
              className="w-full p-2 border rounded" 
              value={productName}
              onChange={(e) => setProductName(e.target.value)} 
            />
            <input 
              type="number" 
              placeholder="Price" 
              className="w-full p-2 border rounded" 
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)} 
            />
            <input 
              type="date" 
              className="w-full p-2 border rounded" 
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)} 
            />
            <input 
              type="text" 
              placeholder="Product Type" 
              className="w-full p-2 border rounded" 
              value={productType}
              onChange={(e) => setProductType(e.target.value)} 
            />
          </div>

          {/* Subtypes input field */}
          <div className="mb-4">
            <input 
              type="text" 
              placeholder="Enter Subtypes (comma separated)" 
              className="w-full p-2 border rounded" 
              value={subTypes}
              onChange={(e) => setSubTypes(e.target.value)} 
            />
            {subTypesError && <div className="text-red-500 text-sm">{subTypesError}</div>}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <input 
              type="number" 
              placeholder="Weight Quantity" 
              className="w-full p-2 border rounded" 
              value={weightQuantity}
              onChange={(e) => setWeightQuantity(e.target.value)} 
            />
            <select 
              className="w-full p-2 border rounded" 
              value={weightType}
              onChange={(e) => setWeightType(e.target.value)}
            >
              <option value="ounces">Ounces</option>
              <option value="grams">Grams</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <textarea 
              placeholder="Product Details" 
              className="w-full p-2 border rounded" 
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)} 
            />
            <textarea 
              placeholder="Warning & Additional Information" 
              className="w-full p-2 border rounded" 
              value={warningDescription}
              onChange={(e) => setWarningDescription(e.target.value)} 
            />
          </div>

          <div className="mb-4">
  <select 
    className="w-full p-2 border rounded" 
    value={fullfillmentMethod}
    onChange={(e) => setFullfillmentMethod(e.target.value)}
  >
    <option value="">Select Fulfillment Method</option>
    <option value="Self Pickup">Self Pickup</option> {/* Corrected value */}
    <option value="Deliver at home">Deliver at home</option>
    <option value="Both">Both</option> {/* Corrected value */}
  </select>
</div>


          <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">
            Save Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
