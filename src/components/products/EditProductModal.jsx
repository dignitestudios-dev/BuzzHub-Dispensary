import React, { useState, useEffect } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import axios from "../../axios"; // Import axios instance
import { useNavigate, useParams } from "react-router-dom";

// Define the types and corresponding subtypes
const typesAndSubtypes = {
  "Indica Strains": ["Flower", "Concentrates", "Edibles", "Other"],
  "Sativa Strains": ["Flower", "Concentrates", "Edibles", "Other"],
  "Hybrid Strains": ["Flower", "Concentrates", "Edibles", "Other"],
};

const EditProductModal = ({ onClose, productData, orderId }) => {
  console.log("productData==? ", productData);
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  console.log("images=== ", images);
  const [deletedImages, setDeletedImages] = useState([]);
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
    // Retrieve the fulfillment method from localStorage (if exists)
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && userData.fulfillmentMethod) {
      setFullfillmentMethod(userData.fulfillmentMethod); // Set the fulfillment method from localStorage
    }
    if (productData) {
      setImages(productData.productImage || []);
      setProductName(productData.productName || "");
      setProductPrice(productData.productPrice || "");
      setExpiryDate(productData.expiryDate || "");
      setProductDescription(productData.productDescription || "");
      setWarningDescription(productData.warningDescription || "");
      setProductType(productData.productType || "");
      setSubTypes(productData.subTypes || []);
      setWeightQuantity(productData.weightQuantity || "");
      setWeightType(productData.weightType || "");
      setFullfillmentMethod(productData.fullfillmentMethod || "");
    }
  }, [productData]); // Empty dependency array to run once when component mounts

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (images.length < 5) {
      setImages([...images, ...files]);
    }
  };

  const handleImageRemove = (index) => {
    const removedImage = images[index];
    setImages(images.filter((_, i) => i !== index));
    setDeletedImages([...deletedImages, removedImage]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productType || subTypes.length === 0) {
      setSubTypesError(
        "Please select a product type and at least one subtype."
      );
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("productId", orderId);
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
    formData.append("fullfillmentMethod", fullfillmentMethod); // Use stored fulfillment method

    images.forEach((image) => {
      if (typeof image !== "string") {
        formData.append("productImage", image);
      }
    });

    if (deletedImages.length > 0) {
      deletedImages.forEach((deletedImage) => {
        formData.append("delete_images", deletedImage);
      });
    }

    try {
      const response = await axios.post(
        "dispensary/update-product-by-id",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        console.log("Product added successfully:", response.data.data);
        onClose();
        navigate("/products");
      } else {
        console.error("Failed to add product:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setLoading(false);
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-auto z-10">
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
                    src={
                      typeof image === "string" && image.startsWith("http")
                        ? image
                        : URL.createObjectURL(image)
                    }
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
            disabled={loading}
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded"
          >
            {loading ? "Updating..." : "Save Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
