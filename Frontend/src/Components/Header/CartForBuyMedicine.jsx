import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../Features/cartSlice';


function CartForBuyMedicine() {
    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart.cart);
    const [total,setTotal]=useState()

    function deleteFromCart(product) {
        dispatch(removeFromCart(product));
    }
    
    useEffect(()=>{
        var t=0
        if(cart.length==0){
           setTotal(t);
        }else{
            cart.map(product=>(
                t+=product?.offer_price
            ))
            setTotal(t);
        }
    },[cart])



    return (
        <div className="z-50 absolute top-16 right-[-1px] border bg-gray-100 lg:w-[600%] max-h-max mt-2 rounded-b-lg rounded-tl-lg shadow-lg text-[#BD1E51]">
            {/* connecting div */}
            <div className='w-[34px] h-[41px] absolute right-[-1px] top-[-41px] px-8 border-x bg-gray-100'></div>

            <div className="p-4">
                <h2 className=" text-center text-xl font-semibold mb-4">Your Cart</h2>
                {cart.length === 0 ? (
                    <p className="text-center text-gray-500">Your cart is empty.</p>
                ) : (
                    <div>
                        <ul>
                            {cart.map(product => (
                                <li key={product?.medicine_id} className="flex justify-between items-center mb-4 ">
                                    <span>{product?.name}</span>
                                    <div className="flex items-center">
                                    </div>
                                    <span className='text-lg font-medium flex justify-start'>${product?.offer_price}</span>
                                    <button
                                        onClick={() => deleteFromCart(product.medicine_id)}

                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#BD1E51"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8 ">
                            <div className="flex justify-between items-center mb-4">
                                <span className="font-semibold">Total:</span>
                                <span className="text-xl font-semibold">${total}
                                </span>
                            </div>
                            <button className="w-full bg-[#dd225d] text-white py-2 rounded-lg hover:bg-[#BD1E51] transition">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CartForBuyMedicine


