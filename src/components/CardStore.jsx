import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useStore from "../store/store";
import { Link } from "react-router-dom";

export default function CardStore({ allProducts }) {
  const { cart, setCart, favorites, handleFavorite, removeFavorite,formatPrice,token } =
    useStore();
    console.log(favorites);
    console.log(cart)
    navigate("/details/" + id);

  const viewCart = () => {
    axios
      .get(`http://localhost:3000/carts/one?one=${user?.email}`)
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
        viewCart();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    viewCart(); // Pasar el correo como parámetro
  }, []);

  const [modalOpen, setModalOpen] = useState(false);


  const openModal = () => {
    setModalOpen(true);
  };


  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      {allProducts?.map((item, index) => (
        <div
          className="flex flex-col bg-white items-center m-4 shadow-md shadow-[#000] justify-evenly w-[75vw] p-2 font-montserrat text-black font-semibold h-[80vh] border border-[#8b8b8b] rounded-[10px] sm:w-[80%] md:flex-row md:w-[95%] md:h-[40vh] lg:w-[80%] xl:w-[75%]"
          key={index}
        >
          <img
            className="w-[70%] h-[40vh] overflow-hidden  rounded-[10px] md:w-[50%] lg:w-[40%] md:h-[100%] object-cover"
            src={item.images[0]}
            alt=""
          />
          <div className="flex flex-col items-center md:w-[50%] lg:w-[60%] md:h-full md:items-start md:p-2 md:justify-between lg:p-4">
            <p
              className="cursor-pointer p-2 text-start text-[12px] md:p-0 md:text-left lg:text-[14px]"
              onClick={() => goDetails(item._id)}
            >
              {item.name}
            </p>
            <p className="py-2">{formatPrice(item.price)}</p>

            <label className="z-0 swap swap-flip text-9xl " style={{ position: 'relative', zIndex: '0' }}>
              {/* this hidden checkbox controls the state */}
              <input type="checkbox" />

              <div
                onClick={() => handleFavorite(item._id, item.name)}
                className="z-0 swap-off " style={{ position: 'relative', zIndex: '0' }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.78125 4C4.53699 4 2 6.81981 2 10.1559C2 11.8911 2.27768 13.32 3.31283 14.8234C4.3005 16.258 5.9429 17.7056 8.49134 19.6155L12 22L15.5084 19.6158C18.057 17.7058 19.6995 16.258 20.6872 14.8234C21.7223 13.32 22 11.8911 22 10.1559C22 6.81982 19.463 4 16.2188 4C14.5909 4 13.1818 4.66321 12 5.86323C10.8182 4.66321 9.40906 4 7.78125 4ZM7.78125 6C5.77551 6 4 7.7855 4 10.1559C4 10.7049 4.03107 11.1875 4.10853 11.6325C4.23826 12.378 4.49814 13.0182 4.96014 13.6893C5.74532 14.8297 7.14861 16.11 9.69156 18.0157L12 19.7494L14.3084 18.0157C16.8514 16.11 18.2547 14.8297 19.0399 13.6893C19.7777 12.6176 20 11.6245 20 10.1559C20 7.7855 18.2245 6 16.2188 6C14.9831 6 13.8501 6.58627 12.8033 7.99831C12.6147 8.25274 12.3167 8.40277 12 8.40277C11.6833 8.40277 11.3853 8.25274 11.1967 7.99831C10.1499 6.58627 9.01689 6 7.78125 6Z"
                      fill="#0F1729"
                    ></path>{" "}
                  </g>
                </svg>
              </div>
              <div onClick={() => removeFavorite(item._id)} className="swap-on" style={{ position: 'relative', zIndex: '0' }}>
                <svg
                  className="z-0 w-[30px] h-[30px]"
                  width="64px"
                  height="64px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M7 2C3.31333 2 1 5.21475 1 8.5C1 11.8412 2.67415 14.6994 4.77151 16.9297C6.8721 19.1634 9.47698 20.8565 11.5528 21.8944C11.8343 22.0352 12.1657 22.0352 12.4472 21.8944C14.523 20.8565 17.1279 19.1634 19.2285 16.9297C21.3259 14.6994 23 11.8412 23 8.5C23 5.22013 20.7289 2 17 2C15.275 2 14.0531 2.47979 13.1186 3.20977C12.6785 3.55357 12.311 3.95011 11.9974 4.33639C11.6802 3.94929 11.3091 3.55266 10.8649 3.2079C9.92877 2.48125 8.70883 2 7 2Z"
                      fill="#9a4c4c"
                    ></path>{" "}
                  </g>
                </svg>
              </div>
            </label>
              {token ? (    <button   onClick={() => addProduct(cart._id, item._id)}
              className="bg-black w-[38vw] rounded-[10px] md:rounded-[23px] md:w-[20vw] p-2 h-[7vh] lg:w-[12vw]"
            >
              <p className="text-white">+ Add to cart</p>
              </button>
                  
                ) : (    
                
                <button onClick={openModal}
              className="bg-black w-[38vw] rounded-[10px] md:rounded-[23px] md:w-[20vw] p-2 h-[7vh] lg:w-[12vw]"
            >
              <p className="text-white">+ Add to cart</p>
                </button>  
                )}
            {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 mob:[80vw] ">
          <div className="bg-white w-[30%] mob:w-[80%] shadow-md rounded-lg h-[22%]  flex flex-col justify-evenly items-center">
            <div className="p-4 w-[80%] flex flex-col items-center">
              {/* Contenido del modal */}

              <p className="mb-4 ">You need a account for buy.</p>

              {/* Botón para cerrar el modal */}
            <div className="flex justify-evenly w-[80%]">
              <Link to="/auth-form">
              <button onClick={closeModal} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Sign In
              </button></Link>
              <button onClick={closeModal} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
               Close
              </button>
              </div>
            </div>
          </div>
        </div>
      )}
          </div>
          
        </div>
  
      ))}

    </>
  );
}
