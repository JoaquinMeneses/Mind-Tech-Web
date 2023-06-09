import React from 'react'

export default function Card() {

  const  dataPc = [
    {
        name : 'PC GAMER ',
        description : 'Una computadora personal (PC) es un dispositivo electrónico diseñado para procesar, almacenar y manejar información de manera rápida y eficiente. Combina componentes como la CPU, memoria, almacenamiento y periféricos',
        price : 15000,
        img : 'https://i.postimg.cc/DZBVdQxm/card-removebg-preview-16.png'
    },
    {
        name : 'TECLADO GAMER',
        description : 'Un teclado gamer personal electrónico diseñado para jugar hasta altas horas de la noche',
        price : 25000,
        img : 'https://i.postimg.cc/vmXM3dBQ/card-removebg-preview-19.png'
    },
    {
        name : 'AUDIFONOS',
        description : 'Los audífonos son dispositivos de audio portátiles que se colocan sobre o dentro de los oídos para escuchar sonidos y música de forma personal. Están compuestos por altavoces o transductores que convierten las señales eléctricas en ondas sonoras audibles para el usuario',
        price : 45000,
        img : 'https://i.postimg.cc/SQ16HX59/card-removebg-preview-21.png'
    }
]


    return (

      <>
      {dataPc.map((item, index) => (<div className=" text-black  w-[90%] h-[90%] m-2  border border-black rounded-[23px] flex flex-col sm:w-[40%] sm:h-[80%] md:w-[35%] md:h-[95%] lg:w-[30%] lg:h-[100%] ">
       <div className='border  h-[60%] rounded-t-[23px] flex flex-col justify-center items-center p-2 '>
        <img src={item.img} alt="" className='w-[80%]  h-[98%] object-contain ' />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>

       </div>
       <div className='h-[40%] bg-black  rounded-b-[23px] flex flex-col justify-evenly items-center ' >
        <p  className='text-white font-montserrat tracking-[2px] text-[10px] md:text-[16px] '>{item.name}</p>
        <button className='bg-white w-[130px] h-[40px] rounded-[23px]' >
          <p className='text-[12px] font-semibold font-montserrat tracking-[2px]'>+ Add to cart</p>
        </button>
       </div>
      </div>))}
      </>
    );
  }
