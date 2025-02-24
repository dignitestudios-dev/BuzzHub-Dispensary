import React, { useState, useEffect } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import axios from "../../axios"; // Import axios instance
import { useNavigate } from "react-router-dom";

const typesAndSubtypes = {
  "Indica Strains": [
    "Northern Lights",
    "Afghan Kush",
    "Granddaddy Purple (GDP)",
    "Bubba Kush",
    "Hindu Kush",
  ],
  "Sativa Strains": [
    "Durban Poison",
    "Sour Diesel",
    "Jack Herer",
    "Maui Wowie",
    "Green Crack",
  ],
  "Hybrid Strains": [
    "Blue Dream",
    "Girl Scout Cookies (GSC)",
    "OG Kush",
    "Pineapple Express",
    "White Widow",
  ],
};

const AddProductModal = ({ onClose }) => {
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [warningDescription, setWarningDescription] = useState("");
  const [productType, setProductType] = useState(""); // Store the selected product type
  const [subTypes, setSubTypes] = useState([]); // Store the selected subtypes as an array
  const [weightQuantity, setWeightQuantity] = useState("");
  const [weightType, setWeightType] = useState("");
  const [fullfillmentMethod, setFullfillmentMethod] = useState(""); // Store fulfillment method
  const [subTypesError, setSubTypesError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && userData.fulfillmentMethod) {
      let method = userData.fulfillmentMethod;
      if (method.toLowerCase() === "pickup") {
        method = "Self Pickup";
      }
      setFullfillmentMethod(method);
    }
  }, []);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
  };

  const handleImageRemove = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/products");

    if (!productType || subTypes.length === 0) {
      setSubTypesError(
        "Please select a product type and at least one subtype."
      );
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("expiryDate", expiryDate);
    formData.append("productDescription", productDescription);
    formData.append("warningDescription", warningDescription);
    formData.append("productType", productType);

    subTypes.forEach((subType) => {
      formData.append("subTypes[]", subType);
    });

    formData.append("weightQuantity", weightQuantity);
    formData.append("weightType", weightType);
    formData.append("fullfillmentMethod", fullfillmentMethod);

    images.forEach((image) => {
      formData.append("productImage", image);
    });

    try {
      const response = await axios.post("dispensary/add-product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.data?.success) {
        console.log("Product added successfully:", response?.data?.data);
        onClose();
        navigate("/products");
        window.location.reload();
      } else {
        console.error("Failed to add product:", response?.data?.message);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleSubTypeChange = (subtype) => {
    setSubTypes((prevSubTypes) => {
      if (prevSubTypes.includes(subtype)) {
        return prevSubTypes.filter((item) => item !== subtype);
      } else {
        return [...prevSubTypes, subtype];
      }
    });
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
            {images.length > 0 &&
              images.map((image, index) => (
                <div
                  key={index}
                  className="w-16 h-16 bg-gray-200 rounded overflow-hidden relative"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Uploaded"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 text-white bg-black bg-opacity-50 p-1 rounded-full"
                    onClick={() => handleImageRemove(index)}
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            <label className="w-16 h-16 flex items-center justify-center bg-green-600 text-white rounded cursor-pointer">
              <FaPlus />
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 border rounded"
              value={productName}
              required
              onChange={(e) => setProductName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Price"
              className="w-full p-2 border rounded"
              value={productPrice}
              required
              onChange={(e) => setProductPrice(e.target.value)}
            />
            <p className=" text-gray-600 ">Expiry Date</p>
            <input
              type="date"
              className="w-full p-2 -mt-2 border rounded"
              value={expiryDate}
              required
              onChange={(e) => setExpiryDate(e.target.value)}
            />
            <div>
              <select
                className="w-full p-2 border rounded"
                value={productType}
                onChange={(e) => {
                  setProductType(e.target.value);
                  setSubTypes([]);
                }}
              >
                <option value="">Select Product Type</option>
                <option value="Indica Strains">Indica Strains</option>
                <option value="Sativa Strains">Sativa Strains</option>
                <option value="Hybrid Strains">Hybrid Strains</option>
              </select>
            </div>
          </div>

          {productType && (
            <div className="mb-4">
              <div className="space-y-3 space-x-1">
                {typesAndSubtypes[productType]?.map((subtype) => (
                  <label
                    key={subtype}
                    className="inline-flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      checked={subTypes.includes(subtype)}
                      onChange={() => handleSubTypeChange(subtype)}
                      className="h-4 w-5 border rounded"
                    />
                    <span>{subtype}</span>
                  </label>
                ))}
              </div>
              {subTypesError && (
                <div className="text-red-500 text-sm">{subTypesError}</div>
              )}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="number"
              placeholder="Weight Quantity"
              className="w-full p-2 border rounded"
              value={weightQuantity}
              required
              onChange={(e) => setWeightQuantity(e.target.value)}
            />
            <select
              className="w-full p-2 border rounded"
              value={weightType}
              onChange={(e) => setWeightType(e.target.value)}
            >
              <option value="">Select Weight Type</option>
              <option value="ounces">Ounces</option>
              <option value="grams">Grams</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <textarea
              placeholder="Product Details"
              className="w-full p-2 border rounded"
              value={productDescription}
              required
              onChange={(e) => setProductDescription(e.target.value)}
            />
            <textarea
              placeholder="Warning & Additional Information"
              className="w-full p-2 border rounded"
              value={warningDescription}
              required
              onChange={(e) => setWarningDescription(e.target.value)}
            />
          </div>

          <div className="mb-4">
            {/* Display Fulfillment Method as Text */}
            {fullfillmentMethod ? (
              <p className="w-full p-2">
                Fullfillment Method <br />
                {fullfillmentMethod}
              </p>
            ) : (
              <p className="text-gray-500">No Fulfillment Method Selected</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded flex items-center justify-center"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
