import React,{useState} from 'react'
import NavBar from '../components/NavBar'
export default function AdminPanel() {

const [currentDiv, setCurrentDiv] = useState(1)

const oneClick = () =>{
  setCurrentDiv(1)
}
const handleOneClick = () => {
  setCurrentDiv(2)
}
const handleTwoClick = () =>{
  setCurrentDiv(3)
}


  return (






    <>
      <NavBar/>
      <div className='w-full h-[10vh] bg-black'></div>
    <div  className='flex flex-col w-full min-h-[100vh] bg-white '>
      <div className='border border-black min-h-[70vh] w-full flex flex-col'>
       <div className='w-[100%] min-h-[80vh] border border-red-900 flex flex-col items-center justify-around'>
        
        {currentDiv === 1 && 
        <form className='w-[90%] min-h-[60vh] flex flex-col items-start pl-2 justify-around bg-[#0000000e] text-black shadow-md shadow-[#000000a8] rounded-[15px]' action="">
          <p className='font-bold font-montserrat tracking-[3px]'>Create new product</p>
          
            <input placeholder='Insert name' className='h-[5vh] w-[95%] bg-[#d6d6d6] rounded-[5px] placeholder:pl-2' type="text" name="" id="" />  
            <textarea placeholder='Description' className='bg-[#d6d6d6] rounded-[3px]' rows={5} cols={35} />
            <input placeholder='Brand' className='h-[5vh] w-[95%] bg-[#d6d6d6] rounded-[5px] placeholder:pl-2' type="text" name="" id="" />
            <select  className='w-[95%] h-[5vh] pl-4 rounded-[5px] bg-[#9797974e] text-[#00000083] ' name="select">
                    <option value="" disabled selected hidden>Select category</option>
                    <option value="value1">GRAPHIC CARDS</option>
                    <option value="value2" >MOTHERBOARDS</option>
                    <option value="value3">MEMORYS RAM</option>
                    <option value="value3">STORAGE</option>
                    <option value="value3">PROCESSORS</option>
                    <option value="value3">LAPTOPS</option>
                    <option value="value3">HEADSETS</option>
                    <option value="value3">LIQUID REFRIGERATION</option>
                    <option value="value3">CHAIRS</option>
                    <option value="value3">MOUSES</option>
                    <option value="value3">KEYBOARDS</option>
            </select>
            <input placeholder='Insert price' className='h-[5vh] w-[95%]  bg-[#d6d6d6] rounded-[5px] placeholder:pl-2' type="text" name="" id="" />
            <div className='w-full flex flex-col'>
              <p>Quantity:</p>
              <div className='w-full flex justify-evenly'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                    </svg>

                    <input className='h-[5vh] w-[20%]  bg-[#d6d6d6] rounded-[5px] placeholder:pl-2' type="number" name="" id="" />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>

              </div>
            </div>

        </form>}
        {currentDiv === 2 && <form className='w-[90%] min-h-[60vh] bg-blue-400' action=""></form>}
        {currentDiv === 3 && <form className='w-[90%] min-h-[60vh] bg-green-400' action=""></form>}

        <div className=' w-[90%] h-[5vh] flex items-center justify-evenly'>
          <div onClick={oneClick} className='w-[15vw] h-[2vh] bg-[#8d8c8cfe] rounded-[15px] cursor-pointer shadow-md shadow-[#000000a6] hover:scale-[.9]'></div>
          <div onClick={handleOneClick} className='w-[15vw] h-[2vh] bg-[#8d8c8cfe] rounded-[15px] cursor-pointer shadow-md shadow-[#000000a6] hover:scale-[.9]'></div>
          <div onClick={handleTwoClick} className='w-[15vw] h-[2vh] bg-[#8d8c8cfe] rounded-[15px] cursor-pointer shadow-md shadow-[#000000a6] hover:scale-[.9]'></div>
        </div>
       </div>
       <div className='w-[100%] h-[70vh] border border-green-800 flex flex-col items-center justify-around'>
       <p>Load Stock & Stats</p>
       <form className='w-[90%] h-[75%] bg-green-400' action="">

        </form>
       </div>
      </div>
      <div className='w-full h-[70vh] bg-pink-500 flex flex-col items-center'>
       <p>Manege Shipments</p>
      </div>
    </div>
    </>
  )
}



/* Description 
Images 3
Brand 
Price
Category 
Quantity */