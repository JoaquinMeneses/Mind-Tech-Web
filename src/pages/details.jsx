import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useStore from "../store/store";

export default function details() {

  let [image, setImage] = useState(0)
  const { id } = useParams()
  const { oneProduct, getOneProduct } = useStore();

  useEffect(() => {
    getOneProduct(id);
  }, []);

  function next(array) {
    setImage(image + 1)
    if (image === array.length - 1) {
      setImage(0)
    }
  }
  function prev(array) {
    setImage(image - 1)
    if (image === 0) {
      setImage(array.length - 1)
    }
  }

  return (
    <>
      <div className='flex justify-center mob:h-full h-[100vh] w-full bg-black '>

        <div className='flex mob:flex-col  mt-[12vh] bg-[#D9D9D9] mob:rounded-tr-[300px] rounded-tl-[300px] lg:rounded-br-[300px] mob:h-full sm:h-[87%] w-[90%] pb-5'>

          <div className='sm:p-5 sm:w-[20%] relative'>
            <div className='mob:pl-2 flex tl:w-[25vw] tl:ml-[-1vw]'>
              <img className='w-8 h-8 mt-[25vh] z-10  opacity-30 ' onClick={() => prev(oneProduct.images)} src="https://cdn-icons-png.flaticon.com/128/6407/6407299.png" alt="" />
              {oneProduct.images ? <img className="z-0 sm:ml-[-10%] sm:mt-[-2%] mob:w-[65vw] mob:h-[40vh] tl:w-[80vw] " src={oneProduct.images[image]} alt="" /> : null}
              <img className='z-10 w-8 h-8 mt-[25vh]  opacity-30' onClick={() => next(oneProduct.images)} src="https://cdn-icons-png.flaticon.com/128/6407/6407301.png" alt="" />
            </div>
            <div className="mob:ml-4 mob:mt-[10%] mt-3  sm:ml-[-2vw] h-[12vh] tl:w-[30vw] mob:w-[80vw] bg-white rounded-[10vh] flex justify-center">
              <p className=' text-[8vh] font-bold tracking-[10px]  text-black tl:text-[3vh]  tl:text-[8vh]'>${oneProduct.price}</p>
            </div>
            <div className='mob:ml-5 mob:mt-5 flex-col mt-2 sm:mt-[16vh] ml-5'>
              <p className='flex text-[#00A524] text-[3vh] tl:text-[2.5vh] gap-3'><img className='w-[40px] tl:h-[30px]' src="../public/shipping.png" alt="" />shipping free</p>
              <p className='flex text-[#00A524] text-[3vh] tl:text-[2.5vh] gap-3 mt-2'><img className='w-[40px] tl:h-[30px]' src="../public/interest.png" alt="" />interest-free fees</p>
            </div></div>
          <div className='sm:ml-[6%] sm:w-[50%] flex flex-col items-center tl:ml-[20%]'>
            <h1 className='mt-3 font-semibold tracking-[15px] text-[5vh]  text-black '>DETAILS</h1>
            <div className="flex flex-col justify-center items-center mt-5 sm:ml-[-2vw] h-[18vh] mob:h-[28vh] tl:h-[30vh] w-[100%] bg-[#ACABAB] rounded-[10vh] tl:flex tl:flex-col tl:justify-center" >
              <p className='w-[90%]  font-bold text-[3vh] flex justify-center  text-black mob:text-[2.5vh] tl:text-[2vh] tl:ml-[4%]' >{oneProduct.name}</p>
              <p className=' flex justify-center lg:tracking-[3px] text-[3vh] mob:text-[2vh] tl:text-[1.5vh]'>Color : Mineral gray | Atlantic Green | Black</p>
            </div>

            <div className='mt-5 mob:ml-[6%] font-semibold text-black text-left flex flex-col text-[3vh]  tl:text-[2vh]'>
              {oneProduct.description}
            </div>
            <p className='ml-[3%] mt-5 font-bold text-[#00A524] text-[2.5vh] tracking-[4px]'>Buy it now in 12 installments without interest! </p>
            <p className=' font-bold text-[#00A524] text-[2.5vh] tracking-[2px]'>${(oneProduct.price / 12).toFixed(2)}</p>
            <p className='mt-2  text-black font-semibold flex text-[3vh] items-center'  ><img className="mr-5 w-[20px]" src="../public/menos.png" alt="" /> Amount : 1 <img className="ml-5  w-[18px] h-[2vh] " src="../public/mas.png" alt="" /> </p>
            <div className="mt-5  text-black text-[5vh] font-bold flex justify-center items-center  h-[10vh] w-[20vw] mob:w-[80%] mob:text-[3vh] bg-[#00A524] rounded-[10vh] tl:text-[2vh]">
              + ADD TO CART

            </div>
          </div>

        </div>

      </div>
    </>
  )
}
