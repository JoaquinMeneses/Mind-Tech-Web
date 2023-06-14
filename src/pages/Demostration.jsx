import React, { useState, useEffect } from "react";
import axios from "axios";
import CardStore from "../components/CardStore";

import useStore from "../store/store";

export default function () {
  const { allProducts, getAllProducts, cart, setCart } = useStore();

  useEffect(() => {
    if (!allProducts?.length) {
      getAllProducts();
    }
  }, []);

  const viewCart = (email) => {
    axios
      .get(`http://localhost:3000/carts/one?one=${email}`)
      .then((res) => {
        setCart(res.data.cart);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addProduct = (cartID, productID) => {
    axios
      .post(
        `http://localhost:3000/carts/addProduct?cartID=${cartID}&productID=${productID}`
      )
      .then((res) => {
        setCart(res.data.cart);
        viewCart("joakin@mt.com");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const delProduct = (cartID, productID) => {
    axios
      .delete(
        `http://localhost:3000/carts/delProduct?cartID=${cartID}&productID=${productID}`
      )
      .then((res) => {
        setCart(res.data.cart);
        viewCart("joakin@mt.com");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeProduct = (cartID, productID) => {
    axios
      .put(
        `http://localhost:3000/carts/removeProduct?cartID=${cartID}&productID=${productID}`
      )
      .then((res) => {
        setCart(res.data.cart);
        viewCart("joakin@mt.com");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const clearCart = (cartID) => {
    axios
      .put(`http://localhost:3000/carts/clearcart?cartID=${cartID}`)
      .then((res) => {
        setCart(res.data.cart);
        viewCart("joakin@mt.com");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    viewCart("joakin@mt.com"); // Pasar el correo como parámetro
  }, []);

  console.log(cart?.products);

  return (
    <div>
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            onClick={() => viewCart("joakin@mt.com")}
            htmlFor="my-drawer-4"
            className="drawer-button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6  sm:w-4 sm:h-4 md:w-6 md:h-6 hover:border-b-[1px] hover:border-white z-index-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              ></path>
            </svg>
          </label>
        </div>
        <div className={`drawer-side open`}>
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
          <div className="flex flex-col p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <h1 className="text-4xl font-bold text-center text-white mb-2">
              CART
            </h1>
            {cart?.products.map((item, index) => (
              <div
                className="rounded-lg border-1 border-black bg-white p-1 mb-2"
                key={index}
              >
                <div className="flex justify-between">
                  <h1 className="text-black text-[2vh] w-[90%]">{item.name}</h1>
                  <button
                    onClick={() => removeProduct(cart._id, item.product_id)}
                    className="text-black w-[10%]"
                  >
                    <img
                      className="w-[20px] h-[20px]"
                      src="https://cdn-icons-png.flaticon.com/512/860/860778.png"
                      alt="remove product"
                    />
                  </button>
                </div>
                <div className="flex items-center">
                  <img className="w-[30%] h-[10vh]" src={item.images} alt="" />
                  <div className="flex flex-col items-center justify-center w-[70%]">
                    <p className="text-black">Price:${item.price}</p>
                    <div className="flex justify-center items-center">
                      <img
                        className="cursor-pointer w-[18px] h-[18px] mr-2"
                        src="https://cdn-icons-png.flaticon.com/128/4436/4436695.png"
                        alt="reduce product"
                        onClick={() => delProduct(cart._id, item.product_id)}
                      />
                      <p className="text-black">Quantity:{item.quantity}</p>
                      <img
                        className="cursor-pointer w-[18px] h-[18px] ml-2"
                        src="https://cdn-icons-png.flaticon.com/128/4369/4369555.png"
                        alt="increase product"
                        onClick={() => addProduct(cart._id, item.product_id)}
                      />
                    </div>
                    <p className="text-black">Subtotal:${item.subtotal}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="w-full justify-end">
              <p className="text-xl font-bold text-center text-white mb-2">
                Total:${cart?.total}
              </p>
              <button
                onClick={() => clearCart(cart._id)}
                className="btn btn-outline btn-error w-full mb-2"
              >
                Clear cart
              </button>
              <button className="btn btn-outline btn-success w-full mb-2">
                Continue to checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <CardStore
        allProducts={allProducts}
        cartID={cart?._id}
        setCart={setCart}
        viewCart={viewCart}
      />
    </div>
  );
}
