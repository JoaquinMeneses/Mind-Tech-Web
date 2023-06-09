import React, { useState,useEffect } from 'react'
import NavBar from '../components/NavBar'
import CardStore from '../components/CardStore'
import axios from 'axios'


export default function Store() {


    const [menuFilter, setMenuFilter] = useState(false)
    const [menuSort, setMenuSort] = useState(false)
    const[input, setInput] = useState([])
    const clickFilter = () => {
        setMenuFilter(!menuFilter)
    }
    const clickSort = () => {
       setMenuSort(!menuSort)
    }



    useEffect(()=>{
       axios.get('http://localhost:3000/products/all')
      .then(response=>{
            setInput(response.data)
            
            
      })
      .catch(error=>{
        console.log(error)
      })
    }, [])
    
    
    

       console.log(input)

    return (

        <div className='w-full min-h-[100vh] bg-[#ffffff] flex flex-col'>
            <NavBar />
            <div className='w-full h-[10vh] bg-white'></div>
            {/* mobile hasta 640px */}
            <div className='w-[100%] sm:hidden min-h-[120vh] border border-black '>
                <div className='flex flex-col w-full  items-center '>
                    <div className='w-full h-[15vh]  flex justify-around items-center' >
                        <div  className='w-[45vw] h-[10vh] border flex justify-evenly items-center '>
                            <p>Filters</p>
                            <svg  onClick={clickFilter} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                            {menuFilter && (
                                <>
                                <div className='absolute w-[45vw] min-h-[30vh] top-[150px] bg-[#eeeeeef8] text-[#636262] '>
                                    <div className='w-full min-h-[20vh] border border-[#727272a8] flex flex-col justify-around' >
                                    <p className='pl-2'>Brand:</p>
                                    <div className='flex items-center justify-evenly'>
                                        <input type="radio" name="" id="" />
                                        <label htmlFor="">Example 1</label>
                                    </div>
                                    <div className='flex items-center justify-evenly'>
                                        <input type="radio" name="" id="" />
                                        <label htmlFor="">Example 2</label>
                                    </div>
                                    <div className='flex items-center justify-evenly'>
                                        <input type="radio" name="" id="" />
                                        <label htmlFor="">Example 3</label>
                                    </div>
                                   

                                    </div>
                                    <div className='w-full min-h-[20vh] border border-[#727272a8] flex flex-col justify-around' >
                                    <p className='pl-2'>Brand:</p>
                                    <div className='flex items-center justify-evenly'>
                                        <input type="radio" name="" id="" />
                                        <label htmlFor="">Example 1</label>
                                    </div>
                                    <div className='flex items-center justify-evenly'>
                                        <input type="radio" name="" id="" />
                                        <label htmlFor="">Example 2</label>
                                    </div>
                                    <div className='flex items-center justify-evenly'>
                                        <input type="radio" name="" id="" />
                                        <label htmlFor="">Example 3</label>
                                    </div>

                                    </div>
                                    <div className='w-full h-[20vh] border border-[#727272a8] flex items-center flex-col justify-around' >
                                    <input className='w-[30vw] h-[8vh] bg-white border border-[#727272a8] p-2 ' placeholder='-$Min' type="text" />
                                    <input className='w-[30vw] h-[8vh] bg-white border border-[#727272a8] p-2 ' placeholder='-$Max' type="text" />
                                    </div>
                                </div>
                                </>
                            )}

                        </div>
                        <div className='w-[45vw] h-[10vh] border flex justify-evenly items-center'>
                            <p>Sort By</p>
                            <svg onClick={clickSort} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                            {menuSort && (
                                <>
                                <div className='absolute w-[45vw] min-h-[30vh] top-[150px] bg-[#eeeeeef8] text-[#636262] '>
                                    <div className='w-full min-h-[30vh] border border-[#727272a8] flex flex-col justify-evenly items-center'  >
                                     <p>Todos</p>
                                     <p>Mayor precio</p>
                                     <p>Menor precio</p>
                                   
                                    </div>
                                    
                                </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className=' flex bg-[#9797974e] text-[#000000b9] items-center rounded-[15px] justify-evenly'>
                        <input className='w-[60vw] h-[5vh] placeholder:text-[#000000b9]  p-2 text-center bg-transparent ' placeholder='Search...' type="search" />
                        
                    </div>

                </div>
                <div className=' w-full min-h-[140vh] flex flex-col items-center justify-around' >
                 <CardStore/>  
                </div>
            </div> 

            <div className='hidden sm:w-full sm:h-min-[100vh] sm:bg-[#ececec] sm:flex ' >
            <div className='  sm:w-[30%] md:w-[25%] lg:w-[20%] xl:w-[18%] sm:h-full flex '></div>
                <div className=' p-4 fixed  text-[#00000083] sm:w-[30%] md:w-[25%] lg:w-[20%] xl:w-[18%] sm:h-full flex flex-col items-center '>
                    <p className='font-medium'>Filters:</p>
                    <div className='w-full min-h-[30vh] py-4  flex flex-col justify-around' >
                        <p className='pl-2 font-medium'>Brand:</p>
                        <div className='flex items-center justify-evenly'>
                            <input type="radio" name="" id="" />
                            <label htmlFor="">Example 1</label>
                        </div>
                        <div className='flex items-center justify-evenly'>
                            <input type="radio" name="" id="" />
                            <label htmlFor="">Example 2</label>
                        </div>
                        <div className='flex items-center justify-evenly'>
                            <input type="radio" name="" id="" />
                            <label htmlFor="">Example 3</label>
                        </div>
                        <p className='font-medium text-[#FF6B00] pl-7 lg:pl-10 xl:pl-14' >See more</p>

                    </div>
                    <div className='w-full min-h-[30vh] py-4 flex flex-col justify-around' >
                        <p className='pl-2 font-medium'>Brand:</p>
                        <div className='flex items-center justify-evenly'>
                            <input type="radio" name="" id="" />
                            <label htmlFor="">Example 1</label>
                        </div>
                        <div className='flex items-center justify-evenly'>
                            <input type="radio" name="" id="" />
                            <label htmlFor="">Example 2</label>
                        </div>
                        <div className='flex items-center justify-evenly'>
                            <input type="radio" name="" id="" />
                            <label htmlFor="">Example 3</label>
                        </div>
                        <p className='font-medium text-[#FF6B00] pl-7 lg:pl-10 xl:pl-14'>See more</p>

                    </div>

                    <div className='w-full h-[20vh] flex flex-col items-start  justify-around' >
                        <p className='pl-2 font-medium'>Price:</p>
                        <div className='w-full flex  justify-between items-center' >
                            <input className='w-[12vw] md:w-[10vw] lg:w-[8vw] h-[5vh] rounded-[5px] bg-white border border-[#727272a8] p-2 ' placeholder='-$Min' type="text" />
                            <p className='text-black '>-</p>
                            <input className='w-[12vw] md:w-[10vw] lg:w-[8vw] h-[5vh] rounded-[5px] bg-white border border-[#727272a8] p-2 ' placeholder='-$Max' type="text" />
                        </div>

                    </div>
                </div>
                <div className='sm:w-[70%] md:w-[75%] lg:w-[80%] xl:w-[82%] sm:h-full flex flex-col  '>
                <div className='w-full h-[10vh]  flex'></div>
                    <div className='w-full h-[10vh] bg-[#ececec] pr-[30vw] md:pr-[20vw] lg:pr-[15vw] flex justify-around items-center fixed'>
                    <div className='flex items-center justify-evenly  w-[30vw] h-[6vh] rounded-[15px]' >
                            <select  className='w-full h-full pl-4 rounded-[15px] bg-[#9797974e] text-[#00000083] ' name="select">
                                <option value="" disabled selected hidden>Sort By</option>
                                <option value="value1">All Products</option>
                                <option value="value2" >Max Price </option>
                                <option value="value3">Min Price</option>
                            </select>
                            
                        </div>

                        <div className='flex items-center justify-evenly border border-blac  w-[20vw] h-[6vh] rounded-[15px]  text-[#00000083] bg-[#9797974e] '>
                            <input onKeyUp={(e)=>handleSearch(e)}  placeholder='Search...' className='bg-transparent p-2 placeholder:text-[#00000083]  w-[15vw] h-[6vh] rounded-[15px]' type="search" name="" id="" />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6  h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>

                        </div>
                    </div>
                    <div className='w-full min-h-[90vh]  flex flex-col items-center border-l border-black '>
                      <CardStore search={input?.products}/>
                    </div>
                </div>
            </div>

        </div>

    )
}
