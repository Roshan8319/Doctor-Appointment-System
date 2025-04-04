import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LoadingScreen from '../Constants/LoadingScreen.jsx';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Features/cartSlice.js';

function BuyMedicine() {
  const [medicine, setMedicine] = useState([]);
  const [loading,setLoading]=useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true)
    getMedicine(1);
  }, []);


  async function getMedicine(page) {
    setLoading(true)
    try {
      const response = await axios.get(`https://doctor-appointment-ashy.vercel.app/api/v1/medicine/get-all-medicine?page=${page}`);
      if (response.status === 200) {
        setMedicine([...response.data.data]);
      }
    } catch (error) {
      console.log(error);
    } finally{
      setLoading(false)
    }
  }

  function addToCartButton(product){
    console.log("Add to cart clicked");
    dispatch(addToCart(product));
  }

  return (
    <div>
      <div className='p-10 grid grid-cols-4 gap-y-5'>
        {medicine.length > 0 && medicine.map(product => (
          <div key={product.medicine_id} className="relative rounded-xl border overflow-hidden max-h-max w-5/6 group hover:shadow-2xl text-[#BD1E51]">
            <figure className="w-[90%] mx-auto mt-2 p-5">
              <img
                src={product.product_image}
                alt="medicine"
                className="w-full h-[150px] rounded-sm object-cover"
              />
              <h1 className="mt-3 text-xl font-semibold">{product.name}</h1>
            </figure>

            <section className="absolute bottom-0 w-full bg-white rounded-t-lg p-5 transition-transform duration-500 ease-in-out transform translate-y-full group-hover:translate-y-0">
              <div className="flex justify-between">
                <h1 className="text-xl font-semibold">{product.name}</h1>
              </div>
              <div className='mt-4 flex flex-col gap-x-2'>
                {product.usage.map((useCase, index) => (
                  <li key={index} className="text-sm text-gray-400 font-medium underline">{useCase}</li>
                ))}
              </div>
              <div className='mt-3 flex items-center justify-between'>
                <div>
                  <h1 className='text-xl font-medium'>₹ {product.offer_price} <span className='ml-1 text-xs text-gray-400'>MRP <span className='line-through'>₹ {product.mrp}</span></span> </h1>
                </div>
                <div>
                  <button
                    onClick={() => addToCartButton(product)}
                    className="mb-1 block bg-[#F1B814] text-white py-2 px-4 rounded-lg text-center text-sm font-semibold transition-transform duration-300 ease-in-out hover:shadow-md hover:transform hover:-translate-y-0.5"
                  >
                    Add to Cart
                  </button>
                  <Link
                    to='details'
                    state={product}
                    className='text-sm hover:underline hover:font-medium'
                  >
                    {`View Details >>`}
                  </Link>
                </div>
              </div>
            </section>
          </div>
        ))}
      </div>
      <div className='mb-20 w-full max-h-max flex items-center justify-center text-[#BD1E51] font-medium gap-x-2'>
        <button
          onClick={() => { getMedicine(1) }}
          className='h-8 w-8 border border-[#BD1E51] hover:underline '
        >1</button>
        <button
          onClick={() => { getMedicine(2) }}
          className='h-8 w-8 border border-[#BD1E51] hover:underline '
        >2</button>
        <button
          onClick={() => { getMedicine(3) }}
          className='h-8 w-8 border border-[#BD1E51] hover:underline '
        >3</button>
        <button
          onClick={() => { getMedicine(4) }}
          className='h-8 w-8 border border-[#BD1E51] hover:underline '
        >4</button>
      </div>
      <div>
      </div>
        {loading &&(
          <div>
            <LoadingScreen/>
          </div>
         
          )}
    </div>
  );
}

export default BuyMedicine;
