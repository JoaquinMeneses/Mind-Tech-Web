import axios from 'axios'
import { Axios } from 'axios'
import React, { useState , useEffect } from 'react'

export default function details() {

    let [prod, productos] = useState([])
    let [image,setImage]=useState(0)
    let [url,setUrl]=useState([])

    useEffect(() => {
        axios("http://localhost:3000/products/one?one=648324d9f5a4ca851ef92623")
          .then(res => {
            productos(res.data.product);
            setUrl(res.data.images)
            setImage(0); 
          })
          .catch(err => console.error(err));
      }, []);

console.log(url)
console.log(prod.images)


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
      <div className='flex justify-center mob:h-[205vh] h-[100vh] w-full bg-black '>

        <div className='flex mob:flex-col  mt-[12vh] bg-[#D9D9D9] rounded-tl-[300px] rounded-br-[300px] mob:h-[190vh] sm:h-[87%] w-[90%]'>

<div className='p-5 sm:w-[20%] relative'>
<div className='flex'>
<img className='w-8 h-8 mt-[25vh] z-10  opacity-30 ' onClick={()=>prev(prod.images)} src="https://cdn-icons-png.flaticon.com/128/6407/6407299.png" alt="" />
{prod.images?<img className="z-0 sm:ml-[-10%] sm:mt-[-2%] mob:w-[80vw] mob:h-[40vh] tl:w-[40vw] " src={prod.images[image]} alt="" /> : null}
<img className='z-10 w-8 h-8 mt-[25vh]  opacity-30' onClick={()=>next(prod.images)} src="https://cdn-icons-png.flaticon.com/128/6407/6407301.png" alt="" />
</div>
<div className="mob:ml-[10%] mob:mt-[10%] mt-3  ml-[-2vw] h-[12vh] w-[18vw] mob:w-[60vw] bg-white rounded-[10vh]">
    <p className=' pl-5 text-[8vh] font-bold tracking-[10px]  text-black tl:text-[3vh] tl:pt-[15%]'>${prod.price}</p>
</div>
<div className='flex-col mt-2 sm:mt-[16vh] ml-5'>
<p className='flex text-[#00A524] text-[3vh] gap-3'><img className='w-[40px] tl:h-[30px]' src="../public/shipping.png" alt="" />shipping free</p>
<p className='flex text-[#00A524] text-[3vh] gap-3 mt-2'><img className='w-[40px] tl:h-[30px]' src="../public/interest.png" alt="" />interest-free fees</p>
</div></div>    
        <div className='sm:ml-[6%] sm:w-[50%] flex flex-col items-center'>
<h1 className='mt-3 font-semibold tracking-[15px] text-[5vh]  text-black'>DETAILS</h1>
<div className="mob:p-[10%] mt-5 sm:ml-[-2vw] h-[18vh] mob:h-[28vh] w-[100%] bg-[#ACABAB] rounded-[10vh] tl:flex tl:flex-col tl:justify-center" >
<p  className='mt-[4vh] font-bold text-[3vh] flex justify-center  text-black mob:text-[2.5vh] tl:text-[3vh]' >{prod.name}</p>
<p className=' flex justify-center lg:tracking-[3px] text-[3vh] mob:text-[2vh] tl:text-[2vh]'>Color : Mineral gray | Atlantic Green | Black</p>
</div>

<div className='mt-5 mob:ml-[6%] font-semibold text-black text-left flex flex-col text-[3vh]  tl:text-[2vh]'>
{prod.description}
</div>
<p className='ml-[3%] mt-5 font-bold text-[#00A524] text-[2.5vh] tracking-[4px]'>Buy it now in 12 installments without interest! </p>
<p className=' font-bold text-[#00A524] text-[2.5vh] tracking-[2px]'>${(prod.price/12).toFixed(2)}</p>
<p  className='mt-2  text-black font-semibold flex text-[3vh] items-center'  ><img className="mr-5 w-[20px]" src="../public/menos.png" alt="" /> Amount : 1 <img className="ml-5  w-[18px] h-[2vh] " src="../public/mas.png" alt="" /> </p>
<div className="mt-5  text-black text-[5vh] font-bold flex justify-center items-center  h-[10vh] w-[20vw] mob:w-[80%] mob:text-[3vh] bg-[#00A524] rounded-[10vh] tl:text-[2vh]">
+ ADD TO CART

</div>
        </div>
        
        </div>

      </div>
    </>
  )
}
