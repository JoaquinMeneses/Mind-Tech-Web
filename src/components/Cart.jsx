import React from 'react';
import useStore from '../store/store';
import { useState } from 'react';

const CartItem = ({ item }) => {
  const [amount,setAmount]=useState(1)

  function sumar() {
    setAmount(amount + 1)
  }
  function restar() {
    setAmount(amount - 1)
 
  }
  const { removeCartItem } = useStore();

  const handleRemoveItem = () => {
    console.log("anda")
    console.log(item._id)
    removeCartItem(item._id);
  };

  return (
    <div className="rounded-lg border-1 border-black bg-white w-[90%] h-[17vh] p-1" key={item.id}>
      <h1 className="text-black text-[2vh]">{item.name}</h1>
      <div className="flex items-center">
        <img className="w-[30%] h-[10vh]" src={item.images[0]} alt="" />
        <div className="flex flex-col items-center justify-center w-[70%]">
          <p className="text-black">Price:{item.price}</p>
          <p className="flex text-black"> {amount == 1? (null):<img onClick={restar} className='cursor-pointer w-[18px] h-[18px] mr-2' src="https://cdn-icons-png.flaticon.com/128/4436/4436695.png" alt="" /> }  Amount: {amount} {item.quantity > amount? <img onClick={sumar} className='cursor-pointer w-[18px] h-[18px] ml-2' src="https://cdn-icons-png.flaticon.com/128/4369/4369555.png" alt="" /> : null}</p>
        </div>
        <button className='text-black' onClick={() => handleRemoveItem(item)}>
          <img className="w-[30px] mr-5" src="https://cdn-icons-png.flaticon.com/512/860/860778.png" alt="" />
        </button>
      </div>
    </div>
  );
};

export default function Cart({ cartOpen, handleCartClick }) {
  const cartItems = useStore((state) => state.cartItems);
  const setCartItems = useStore((state) => state.setCartItems);
  const [cart,setCart] =useState({cartOpen})


  console.log(cartItems);
  const $subtotal = cartItems.reduce((total, item) => total + item.price * item.amount, 0);
  
  return (
    <>
      {cartOpen?(
        <div className="mob:fixed mob:bottom-0 mob:left-0 mob:right-0 mob:w-[100vw] overflow-auto sm:mr-[-3vh] bg-black/90 h-[100vh] sm:mt-[90vh] sm:w-[40%] flex flex-col  items-center">
          <div className="mt-5 w-full flex flex-col justify-center items-center">
          <div className='flex w-full justify-end pr-5'>     
           <button
              className=" text-white text-xl focus:outline-none"
              onClick={ handleCartClick}
            >

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button></div>
            <h1 className="text-4xl font-bold">CART</h1>
          
      
          </div>
          <div className="w-full flex flex-col items-center gap-5 p-5">
            {cartItems?.map((item) => (
              <CartItem item={item} key={item.id} />
            ))}
            <div className="text-white">
              <span>
                Subtotal: <span className="subtotal">${$subtotal}</span>
              </span>
            </div>
            <button className="mb-3 inline-block rounded-full border-2 border-neutral-50 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-gray transition duration-150 ease-in-out hover:border-neutral-100 bg-green-200/60 hover:bg-green-500/50 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-gray-600 dark:hover:bg-opacity-10">
              Continue to checkout
            </button>
          </div>
        </div>
      ):false}
    </>
  );
}
