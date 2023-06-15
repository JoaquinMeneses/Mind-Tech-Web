import React from "react";
import { useNavigate } from "react-router-dom";

export default function Card({ favorites }) {
  const navigate = useNavigate();
  const goDetails = (id) => {
    navigate("/details/" + id);
  };
  return (
    <>
      {favorites.map((item, index) => (
        <div className=" text-black  w-[90%] h-[90%] m-2  border border-black rounded-[23px] flex flex-col sm:w-[40%] sm:h-[80%] md:w-[35%] md:h-[95%] lg:w-[30%] lg:h-[100%] ">
          <div className="border border-red-900 h-[60%] rounded-t-[23px] flex flex-col justify-center items-center p-2 ">
            <img
              src={item.images}
              alt=""
              className="w-[80%]  h-[85%] object-contain "
            />
          </div>
          <div className="h-[40%] bg-black  rounded-b-[23px] flex flex-col justify-evenly items-center ">
            <p className="text-white font-montserrat tracking-[2px] text-[10px] md:text-[12px] text-center ">
              {item.name}
            </p>
            <button className="bg-white w-[130px] h-[40px] rounded-[23px]">
              <p
                onClick={() => goDetails(item._id)}
                className="text-[12px] font-semibold font-montserrat tracking-[2px]"
              >
                View product
              </p>
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
