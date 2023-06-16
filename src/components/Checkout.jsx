import React from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useState } from 'react';
import axios from 'axios'
import useStore from "../store/store";


export default function Index() {

  initMercadoPago("TEST-94fb06b1-a38f-4f4e-b718-bb299403a6e1");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [paymentMethod, setPayment] = useState("");
  const [showData, setShowData] = useState(false);
  const [preferenceId, setPreferenceId] = useState(null);
  const [click, setClick] = useState(false)
  const [cancelPayment, setCancelPayment] = useState(false)
  const {cart,formatPrice} = useStore();
  console.log(cart?.products) 

  const donate = () => {
    setClick(!click)
    setCancelPayment(!cancelPayment)
  }
  const cancel = () => {
    setClick(false)
    setCancelPayment(false)
    setPreferenceId(null); // setea el preferenceId en null para limpiarlo y volver a generar otro pago
  }

  const handlePayment = async (amount) => {
    try {
      const response = await axios.post('http://localhost:3000/payments', {
        unit_price: amount,
      });

      const preferenceId = response.data.preferenceId;
      setPreferenceId(preferenceId);

    } catch (error) {
      console.error(error);
    }
  };

  const renderPaymentButton = () => {
    if (preferenceId) {
      return (
        <div className="text-white flex flex-col justify-center absolute p-10 rounded top-50% bg-[#dddddd] z-20 h-[20vh] w-[30vw] animate__animated animate__fadeIn  ">
          <Wallet initialization={{ preferenceId }} />
          <button onClick={cancel} className="text-black">Cancel payment ❌</button>
        </div>
      );
    }

    return null; // No muestra el div si no se genera el preferenceId
  };

  const total = cart?.products.reduce((accumulator, product) => {
    return accumulator + Number(product.subtotal);
  }, 0);
console.log(total)
  return (

    <>
      
      <div className="flex flex-col  justify-center items-center w-full min-h-[100vh] bg-[#000000a9] ">
        <p className='text-[16px] font-bold tracking-[1px]  text-white'>CHECKOUT PAYMENT</p>
        <div className='w-full flex flex-col md:flex-row items-center  justify-evenly'>
          <div className="w-[90%] m-2 rounded-[15px] bg-[#313742a0] p-2 min-h-[50vh] mt-4 flex flex-col items-center pl-2 justify-around  text-black   sm:w-[70%]  md:w-[60%]  md:h-[60vh] ">
            
            <h2 className='md:text-[26px] text-white font-bold'>Purchase details</h2>
            <table className='w-[100%] rounded-[2px] md:p-10 flex flex-col border text-black border-black min-h-[10vh] bg-white'>
              <tr className='text-left text-[10px] w-full flex'>
                <td className='border p-1 w-[20%] text-left md:h-[6vh] md:text-[20px] border-white bg-[#66656559]'>Unit</td>
                <td className='border p-1 w-[15%] text-left md:h-[6vh] md:text-[20px] border-white bg-[#66656559]'>Price</td>
                <td className='border p-1 w-[45%] text-left md:h-[6vh] md:text-[20px] border-white bg-[#66656559]'>Product Name</td>
                <td className='border p-1 w-[20%] text-left md:h-[6vh] md:text-[20px] border-white bg-[#66656559]'>Amount:</td>
              </tr>
              {cart?.products.map((item) => (
                <tr className='text-left text-[10px] w-full flex' key={item.id}>
                  <td className='border p-1 w-[20%] md:h-[4vh] md:text-[12px] text-left border-white bg-[#66656559]'>{item.quantity}</td>
                  <td className='border p-1 w-[15%] md:h-[4vh] md:text-[12px] text-left border-white bg-[#66656559]'>{formatPrice(item.price)}</td>
                  <td className='border p-1 w-[45%] md:h-[4vh] md:text-[12px] text-left border-white bg-[#66656559]'>{item.name}</td>
                  <td className='border p-1 w-[20%] md:h-[4vh] md:text-[12px]  border-white bg-[#66656559] text-end'>{formatPrice(item.subtotal)}</td>
                </tr>
              ))}

            <tr className='text-left w-full justify-between flex'>
              <td className='w-[80%] pr-1 bg-[#adadad59] text-end'>Total:</td>
              <td className='border w-[20%]  h-[4vh] text-end py-2 text-[12px] p-1 border-white bg-[#adadad59]'><p>{formatPrice(cart?.total)}</p></td>
            </tr>
            </table>

            <button className='w-[30vw] lg:w-[10vw] h-[5vh] bg-[#000] text-white font-bold tracking-[5px] rounded-[10px]  ' onClick={() => handlePayment(cart?.total)}   >PAY</button>

          </div>


        </div>
        {renderPaymentButton()}
      </div>
    </>
  )
}

