import React from "react";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import axios from "axios";
import apiUrl from "../../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useStore from "../store/store";

export default function AuthForm() {
  const navigate = useNavigate();

  const { login, getUser, user } = useStore();

  const [pages, setPages] = useState(true);

  const emailLogin = useRef();
  const passwordLogin = useRef();

  const name = useRef();
  const email = useRef();
  const password = useRef();

  const sendLogin = (e) => {
    e.preventDefault();
    let data = {
      email: emailLogin.current.value,
      password: passwordLogin.current.value,
    };
    axios
      .post(apiUrl + "users/login", data)
      .then((res) => {
        console.log(res.data.message);
        login(res.data.token);
        localStorage.setItem("token", res.data.token);
        getUser(res.data.user.email);
        console.log(res.data.user.id);
        axios.post(
          apiUrl + "carts/createCartOnLogin?userID=" + res.data.user.id
        );
        navigate("/store");
      })
      .catch((err) => {
        const errorMessages = err.response.data.message;
        let errors = [];
        if (Array.isArray(errorMessages)) {
          errors = errorMessages.map((errorMessage) => ({
            message: errorMessage,
          }));
          errorMessages.forEach((errorMessage) => {
            toast.error(errorMessage);
          });
        } else {
          errors = [{ message: errorMessages }];
          toast.error(errorMessages);
        }
      });
  };

  const sendRegister = (e) => {
    e.preventDefault();
    let data = {
      name: name.current.value,
      email: email.current.value,
      password: password.current.value,
    };
    axios
      .post(apiUrl + "users/register", data)
      .then((res) => {
        console.log(res.data.message);
        handleClick();
        navigate("/auth-form");
        axios.post(apiUrl + "users/send-verification-email", {
          email: data.email,
        });
        toast.success("Check your mailbox for account verification");
      })
      .catch((err) => {
        const errorMessages = err.response.data.message;
        errorMessages.forEach((errorMessage) => {
          toast.error(errorMessage);
        });
        const errors = errorMessages.map((errorMessage) => ({
          message: errorMessage,
        }));
      });
  };

  function handleClick() {
    setPages(!pages);
    console.log(pages);
  }
  return (
    <>
      <div className="mob:hidden">
        <Navbar />
      </div>
      <div className="sm:pt-[10vh] bg-black h-screen text-white flex flex-col items-center ">
        <div className="sm:hidden mob:w-full mob:h-[60vh] flex flex-col justify-center">
          <h1 className="mob:w-full flex justify-center text-[3vh] tracking-[20px] font-bold sm:hidden">
            MINDTECH
          </h1>
          <h2 className="mob:w-full flex justify-center text-[2vh] tracking-[8px] font-semibold sm:hidden ">
            TECNHO
          </h2>
        </div>
        {pages == true ? (
          <>
            <ToastContainer position="top-right" />
            <div className="bg-[#D9D9D9] h-[full] sm:h-[95%] w-full rounded-tl-[60px] sm:w-[95%] sm:rounded-[40px] flex mob:flex-col mob:items-center ">
              <div className="sm:flex sm:flex-col mob:w-[100%] sm:w-[50%] sm:items-center">
                <h1 className="flex justify-center text-black text-[3vh] tracking-[8px] font-bold py-8 sm:text-[6vh]">
                  SIGN IN
                </h1>
                <form className="flex flex-col w-[100%] items-center gap-5 ">
                  <legend className=" w-[80%] rounded-lg mob:bg-white  sm:text-[2.5vh] font-semibold text-black tracking-[8px] pl-2">
                    EMAIL:
                    <div className="flex">
                      <input
                        className="w-[100%] h-[6vh] sm:h-[7vh] bg-white rounded-lg sm:mt-3"
                        type="email"
                        ref={emailLogin}
                      />
                      <img
                        className="w-[40px] h-[40px] sm:mt-5 ml-[-10%] mob:w-[30px] mob:h-[30px] mt-2 mr-1"
                        src="https://cdn-icons-png.flaticon.com/128/3916/3916631.png"
                        alt=""
                      />
                    </div>
                  </legend>
                  <legend className="w-[80%] rounded-lg mob:bg-white  sm:text-[2.5vh] font-semibold text-black tracking-[8px] pl-2">
                    PASSWORD:
                    <div className="flex">
                      <input
                        className="w-[100%] h-[6vh] sm:h-[7vh] bg-white rounded-lg sm:mt-3"
                        type="password"
                        ref={passwordLogin}
                      />
                      <img
                        className="w-[40px] h-[40px] sm:mt-5 ml-[-10%] mob:w-[30px] mob:h-[30px] mt-2 mr-1"
                        src="https://cdn-icons-png.flaticon.com/128/3917/3917642.png"
                        alt=""
                      />
                    </div>
                  </legend>
                  <button className="bg-white rounded-[20px] w-[80%] sm:h-[8vh] sm:w-[55%] h-[10vh] tracking-[3px] text-black text-[2vh] font-bold flex items-center pl-5 gap-5 sm:mt-[6vh]">
                    {" "}
                    <img
                      src="https://rotulosmatesanz.com/wp-content/uploads/2017/09/2000px-Google_G_Logo.svg_.png"
                      className="w-[35px] h-[35px] sm:mr-5 "
                      alt=""
                    />{" "}
                    SIGN IN WITH GOOGLE
                  </button>
                  <button
                    className="bg-black rounded-[20px] w-[80%] sm:h-[8vh] sm:w-[55%] h-[10vh] tracking-[8px] text-[3vh]"
                    onClick={sendLogin}
                  >
                    SIGN IN
                  </button>
                </form>
                <div className="font-semibold flex flex-col items-center justify-center text-black mt-5">
                  <p>You don't have an account yet?</p>
                  <button
                    className="w-[15vw] mob:w-[40vw]"
                    onClick={handleClick}
                  >
                    <label
                      htmlFor=""
                      className="flex flex-row justify-center h-[4vh]  font-bold text-blue-900 cursor-pointer "
                      onClick={handleClick}
                    >
                      Sign Up
                      <input
                        type="checkbox"
                        className=""
                        style={{ appearance: "none" }}
                        value="hola"
                        name="hola"
                      />
                    </label>
                  </button>
                  <p>
                    Go back to{" "}
                    <Link className="font-bold" to="/">
                      Home page
                    </Link>
                  </p>
                </div>
              </div>
              <img
                className="mob:hidden w-[50%]  rounded-r-[30px]"
                src="https://i.postimg.cc/SR5y1wX9/login.png"
                alt=""
              />
            </div>
          </>
        ) : (
          <>
            <ToastContainer position="top-left" />
            <div className="bg-[#D9D9D9] h-[full] sm:h-[95%] w-full rounded-tl-[60px] sm:w-[95%] sm:rounded-[50px] flex mob:flex-col mob:items-center ">
              <img
                className="mob:hidden w-[46%] rounded-[50px]"
                src="https://i.postimg.cc/vBZgJwm2/register.jpg"
                alt=""
              />
              <div className="sm:flex sm:flex-col mob:w-[100%] sm:w-[50%] sm:items-center">
                <h1 className="flex w-[100%]   justify-center text-black text-[3vh] sm:text-[5vh] tracking-[12px] py-8 sm:py-2">
                  REGISTER
                </h1>
                <form className="flex flex-col w-[100%] items-center gap-5">
                  <legend className="w-[80%] rounded-lg mob:bg-white  sm:text-[2.5vh] font-semibold text-black tracking-[8px] pl-2">
                    NAME:
                    <div className="flex">
                      <input
                        className="w-[100%] h-[6vh] sm:h-[7vh] bg-white rounded-lg sm:mt-2"
                        type="text"
                        ref={name}
                      />
                      <img
                        className="w-[40px] h-[40px] sm:mt-4 ml-[-10%] mob:w-[30px] mob:h-[30px] mt-2 mr-1"
                        src="https://cdn-icons-png.flaticon.com/128/3917/3917711.png"
                        alt=""
                      />
                    </div>
                  </legend>
                  <legend className=" w-[80%] rounded-lg mob:bg-white  sm:text-[2.5vh] font-semibold text-black tracking-[8px] pl-2">
                    EMAIL:
                    <div className="flex">
                      <input
                        className="w-[100%] h-[6vh] sm:h-[7vh] bg-white rounded-lg sm:mt-2"
                        type="email"
                        ref={email}
                      />
                      <img
                        className="w-[40px] h-[40px] sm:mt-4 ml-[-10%] mob:w-[30px] mob:h-[30px] mt-2 mr-1"
                        src="https://cdn-icons-png.flaticon.com/128/3916/3916631.png"
                        alt=""
                      />
                    </div>
                  </legend>
                  <legend className="w-[80%] rounded-lg mob:bg-white  sm:text-[2.5vh] font-semibold text-black tracking-[8px] pl-2">
                    PASSWORD:
                    <div className="flex">
                      <input
                        className="w-[100%] h-[6vh] sm:h-[7vh] bg-white rounded-lg sm:mt-2"
                        type="password"
                        ref={password}
                      />
                      <img
                        className="w-[40px] h-[40px] sm:mt-4 ml-[-10%] mob:w-[30px] mob:h-[30px] mt-2 mr-1"
                        src="https://cdn-icons-png.flaticon.com/128/3917/3917642.png"
                        alt=""
                      />
                    </div>
                  </legend>
                  <button className="bg-white rounded-[20px] w-[80%] sm:h-[8vh] sm:w-[55%] h-[10vh] tracking-[3px] text-black text-[2vh] font-bold flex items-center pl-5 gap-5 sm:mt-[2vh]">
                    {" "}
                    <img
                      src="https://rotulosmatesanz.com/wp-content/uploads/2017/09/2000px-Google_G_Logo.svg_.png"
                      className="w-[35px] h-[35px] sm:mr-5 "
                      alt=""
                    />{" "}
                    SIGN IN WITH GOOGLE
                  </button>
                  <button
                    className="bg-black rounded-[20px] w-[80%] sm:h-[8vh] sm:w-[55%] h-[10vh] tracking-[8px] text-[3vh]"
                    onClick={sendRegister}
                  >
                    SIGN UP
                  </button>
                </form>
                <div className="pt-2 font-semibold flex flex-col items-center justify-center text-black">
                  <p>Do you already have an account?</p>
                  <button
                    className="w-[15vw] mob:w-[40vw]"
                    onClick={handleClick}
                  >
                    <label
                      htmlFor=""
                      className="flex flex-row justify-center h-[4vh] w-full font-bold  text-blue-900 cursor-pointer"
                      onClick={handleClick}
                    >
                      Sign In
                      <input
                        type="checkbox"
                        className=""
                        style={{ appearance: "none" }}
                        value="hola"
                        name="hola"
                      />
                    </label>
                  </button>
                  <p>
                    Go back to{" "}
                    <Link className="font-bold" to="/">
                      Home page
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
