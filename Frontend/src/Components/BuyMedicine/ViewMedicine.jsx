import React,{useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Features/cartSlice.js';

const ViewMedicineDetails = () => {


  const location = useLocation();
  let product = location.state;
  const dispatch=useDispatch();


  function addToCartButton(product){
    console.log("Clicked");
    
    dispatch(addToCart(product));
  }





  return (
    <div className="mt-6 p-6 bg-white shadow-md rounded-lg max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-center">
        <img
          src={product.product_image}
          alt={product.name}
          className="w-full border px-2 border-[#F1B814] md:w-1/3 rounded-lg shadow-md mb-6 md:mb-0"
        />
        <div className="md:ml-6 text-[#490B3D]">
          <h2 className="text-2xl font-bold text-gray-800"><span className='text-[#BD1E51]'>{product.name}</span></h2>
          <p className="text-lg text-gray-600 mb-2">{product.description}</p>
          <p className="text-lg font-medium">Brand: <span className='text-[#BD1E51]'>{product.brand}</span></p>
          <p className="text-lg font-medium">Category: <span className='text-[#BD1E51]'>{product.category}</span></p>
          <p className="text-lg font-medium">Dosage Form: <span className='text-[#BD1E51]'> {product.dosage_form}</span></p>
          <p className="text-lg font-medium">Packaging: <span className='text-[#BD1E51]'></span> {product.packaging}</p>
          <p className="text-lg font-medium ">MRP: <span className='text-[#BD1E51]'> ₹{product.mrp}</span></p>
          <p className="text-lg font-medium text-green-600 underline">Offer Price: ₹{product.offer_price}</p>
          <p className="text-lg font-medium">Available Quantity: <span className='text-[#BD1E51]'> {product.quantity_available}</span></p>
          <p className="text-lg font-medium">Expiry Date: <span className='text-[#BD1E51]'>{new Date(product.expiry_date).toLocaleDateString()}</span> </p>
          <p className="text-lg font-medium">Country of Origin: <span className='text-[#BD1E51]'> {product.country_of_origin}</span></p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-[#490B3D]">Manufacturer Details</h3>
        <p className="text-lg text-gray-600">Name: {product.manufacturer.name}</p>
        <p className="text-lg text-gray-600">Address: {product.manufacturer.address}</p>
        <p className="text-lg text-gray-600">Contact: {product.manufacturer.contact}</p>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-[#490B3D]">Ingredients</h3>
        <ul className="list-disc list-inside text-lg text-gray-600">
          {product.ingredients.map((ingredient) => (
            <li key={ingredient._id}>
              {ingredient.name} - {ingredient.strength}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-[#490B3D]">Usage</h3>
        <ul className="list-disc list-inside text-lg text-gray-600">
          {product.usage.map((use, index) => (
            <li key={index}>{use}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-[#490B3D]">Side Effects</h3>
        <ul className="list-disc list-inside text-lg text-gray-600">
          {product.side_effects.map((sideEffect, index) => (
            <li key={index}>{sideEffect}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-[#490B3D]">Warnings</h3>
        <ul className="list-disc list-inside text-lg text-gray-600">
          {product.warnings.map((warning, index) => (
            <li key={index}>{warning}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-[#490B3D]">Storage Instructions</h3>
        <p className="text-lg text-gray-600">{product.storage_instructions}</p>
      </div>

      <div className='flex items-center justify-center'>
        <button
          onClick={() => { addToCartButton(product) }}
          className='text-lg font-medium text-white rounded-lg border border-[#BD1E51] bg-[#BD1E51] px-4'
        >Add to Cart</button>
      </div>
    </div>
  );
};

export default ViewMedicineDetails;
