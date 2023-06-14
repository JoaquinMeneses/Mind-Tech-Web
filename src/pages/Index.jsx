import React, { useEffect, useState } from 'react'
import Card from '../components/Card';
import apiUrl from '../../api.js'

import useStore from "../store/store";

export default function Index() {
  const { allProducts, getAllProducts } = useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [products, setProducts] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const limit = 3;
 



  useEffect(() => {
    if (!allProducts?.length) {
      getAllProducts();
    }
  }, []);

  //Funcion para deslizar 100vh hacia abajo en el inicio al tocar see more
  const handleSeeMore = () => {
    const newScrollPosition = window.innerHeight;
    window.scrollTo({
      top: newScrollPosition,
      behavior: 'smooth',
    });
    setScrollPosition(newScrollPosition);
  };
 
//Funciones para paginacion de productos

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}products/paginate?page=${currentPage}&limit=${limit}`);
        const data = await response.json();

        setProducts(data.products);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [currentPage]);

console.log(products)


  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

 

  
  return (
    <div className="bg-black min-h-[200vh] text-white flex flex-col justify-start  items-center font-montserrat w-full ">
      <div className='bg-[url(https://i.postimg.cc/KzGRwCtF/line.png)] bg-center md:bg-center w-full  bg-cover  flex flex-col items-center  justify-center h-[100vh]' >
        <p className='font-montserrat  tracking-[16px] mob:text-[16px] sm:text-[40px] md:text-[50px] lg:text-[75px] font-bold mb-10 text-center ' >Welcome to the future</p>
        <p className='font-montserrat text-center font-bold text-[20px]  mob:text-[12px] ' >Embrace Tomorrow's Technology: Explore revolutionary <br /> innovations and cutting-edge perspectives on our forward-looking technology website.</p>
        <button onClick={handleSeeMore} className=' transition-all duration-300 hover:scale-[1.2] border-[2px] w-[220px] h-[6vh] rounded-[2%] font-bold bg-[#000000fd] absolute top-[600px] flex flex-col justify-center items-center ' >
          See More 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
          </svg>

        </button>
       
      </div>

      {/* contenedor  cards*/}

      <div className='w-full   min-h-[80vh] bg-white p-10 mt-[10vh]'>
        <p className='text-black text-[14px] sm:text-[25px] font-montserrat font-semibold tracking-[4px] border-b-[2px] border-black w-[220px] p-2 sm:w-[320px]' >Featured Products</p>
        <div className='w-full  h-[55vh] flex items-center md:h-[50vh] lg:h-[55vh] xl:h-[60vh]  ' >
        <svg onClick={handlePrevPage} className='cursor-pointer' fill="#000000" height="40px" width="40px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" transform="rotate(180)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.616,256-256S397.385,0,256,0z M346.899,280.959 l-85.594,85.594c-13.783,13.784-36.132,13.784-49.917,0c-13.784-13.784-13.784-36.133,0-49.917L272.023,256l-60.635-60.635 c-13.784-13.784-13.784-36.133,0-49.917s36.134-13.784,49.917,0l85.594,85.594C360.683,244.825,360.683,267.175,346.899,280.959z"></path> </g> </g> </g></svg>
          <div className='w-[90%] h-[100%]  flex justify-around items-center p-2  ' >
            <Card favorites={products}   />
           
          </div>
          <svg onClick={handleNextPage} className='cursor-pointer' fill="#000000" height="40px" width="40px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.616,256-256S397.385,0,256,0z M346.899,280.959 l-85.594,85.594c-13.783,13.784-36.132,13.784-49.917,0c-13.784-13.784-13.784-36.133,0-49.917L272.023,256l-60.635-60.635 c-13.784-13.784-13.784-36.133,0-49.917s36.134-13.784,49.917,0l85.594,85.594C360.683,244.825,360.683,267.175,346.899,280.959z"></path> </g> </g> </g></svg>

        </div>


        {/* contenedor About Us*/}

        <div className=' min-h-[80vh]  lg:min-h-[160vh] w-full mb-4 border-t-[2px] border-black bg-white flex flex-col items-center justify-around '>
          <p className='text-black text-[25px] font-montserrat font-semibold tracking-[10px] lg:text-[40px]   p-2' >About Us</p>

          <div className=' w-[90%] h-[22vh] bg-[url(https://i.postimg.cc/4ynnNt8S/gamer.png)]  bg-cover sm:bg-center rounded-br-[23px] rounded-tl-[23px] flex lg:h-[40vh] ' >
            <p className='w-[50%] h-[100%] text-left text-[10px] py-14 p-3  bg-[#000000c9] rounded-tl-[23px] tracking-[1px] sm:text-[18px] lg:text-[35px] lg:py-[100px]  ' >Your best gamer setup, you'll find it at Mindtech</p>
          </div>
          <div className=' w-[90%] h-[22vh] bg-[url(https://i.postimg.cc/WbhJ2RC1/desktop.png)] bg-cover sm:bg-center  rounded-bl-[23px] rounded-tr-[23px] flex justify-end lg:h-[40vh]  ' >
            <p className='w-[50%] h-[100%] text-end text-[10px] py-14 p-3  bg-[#000000c9] rounded-tr-[23px] tracking-[1px] sm:text-[18px] lg:text-[35px] lg:py-[100px]' >We have the best products for all  student needs</p>
          </div>
          <div className=' w-[90%] h-[22vh] bg-[url(https://i.postimg.cc/1tvfQMKF/pc.png)] bg-cover sm:bg-center  rounded-br-[23px] rounded-tl-[23px] flex lg:h-[40vh] ' >
            <p className='w-[50%] h-[100%] text-left text-[10px] py-14 p-3  bg-[#000000e0] rounded-tl-[23px] tracking-[1px] sm:text-[18px] lg:text-[35px] lg:py-[100px]' >Your best gamer setup, you'll find it at Mindtech</p>
          </div>

        </div>


        {/* contenedor pagos, envios, tarjetas*/}

        <div className='  sm:flex sm:flex-row bg-white w-full min-h-[80vh] sm:min-h-[30vh] border-t-[2px] border-black '>
          <div className='md:p-2 w-full h-[40vh] flex flex-col items-center justify-around mt-4 '>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10  text-black">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            <p className='font-montserrat font-semibold tracking-[2px] text-[#00A524] text-[20px] text-center  ' >Secure <br /> Payments</p>
            <p className='text-black text-center font-medium text-[14px] md:text-[16px ] lg:text-[25px]' >Our platform offers the highest security when making a payment.</p>

          </div>
          <div className='md:p-2 w-full h-[40vh] flex flex-col items-center justify-around mt-4 '>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10  text-black">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>

            <p className='font-montserrat font-semibold tracking-[2px] text-[#00A524] text-[20px] text-center ' >Shipping</p>
            <p className='text-black text-center font-medium text-[14px] md:text-[16px] lg:text-[25px]' >Shipping nationwide, express in 24hrs, tracking system.</p>

          </div>
          <div className='md:p-2 w-full h-[40vh] flex flex-col items-center justify-around mt-4 '>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10  text-black">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
            </svg>

            <p className='font-montserrat font-semibold tracking-[2px] text-[#00A524] text-[20px] text-center ' >Interest-free <br /> installments</p>
            <p className='text-black text-center font-medium text-[14px] md:text-[16px] lg:text-[25px]' >All means of payment, cash, credit cards, etc.</p>

          </div>
        </div>

        {/* contenedor register, tarjetas, contact*/}

        <div className='  sm:flex-row w-full min-h-[30vh] flex flex-col items-center justify-around '>
          <div className='flex w-full justify-evenly  sm:w-[30%]'>
            <img className='h-[28px] w-[38px]  ' src="https://i.postimg.cc/q7XNmphj/visa.png" alt="" />
            <img className='h-[28px] w-[38px]  ' src="https://i.postimg.cc/MKNfHPJb/mp.png" alt="" />
            <img className='h-[28px] w-[38px]  ' src="https://i.postimg.cc/9Q9R7dW3/master.png" alt="" />
          </div>
          <button className='bg-black w-[50vw] h-[5vh] rounded-[8px] sm:w-[40%] sm:h-[8vh]'>
            REGISTER NOW!
          </button>
          <p className='text-black flex font-montserrat font-semibold justify-evenly w-[100px] sm:w-[30%] '><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-black">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
            Contact
          </p>
        </div>
        {/* contenedor scan qr*/}
        <div className='w-full min-h-[40vh] pb-4 flex flex-col items-center  '>
          <p className='sm:mb-4 text-black font-montserrat font-semibold text-center' >& <br />
            Scan the QR Code and enjoy the mobile version
          </p>
          <div className='border-[2px] rounded-[45px] border-black w-[280px] h-[280px] '>
             <img className='object-contain p-10 ' src="https://i.postimg.cc/LsMqBJXJ/qr.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
