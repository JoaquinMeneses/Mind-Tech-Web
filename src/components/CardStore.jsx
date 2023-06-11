import React from "react";
import { useNavigate } from "react-router-dom";

export default function CardStore({ allProducts }) {
  const navigate = useNavigate();
  const goDetails = (id) => {
    navigate("/details/" + id);
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
            <p className="py-2">${item.price}</p>
            <p className="text-[30px] tracking-[2px] font-light">☆☆☆☆☆</p>
            <button className="bg-black w-[38vw] rounded-[10px] md:rounded-[23px] md:w-[20vw] p-2 h-[7vh] lg:w-[12vw]">
              <p className="text-white">+ Add to cart</p>
            </button>
          </div>
        </div>
      ))}
    </>
  );
}