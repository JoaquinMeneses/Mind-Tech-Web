import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apiUrl from "../../api";

import useStore from "../store/store";

export default function Account() {
  const navigate = useNavigate();

  const { logout, user } = useStore();

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const sendLogout = () => {
    axios
      .post(apiUrl + "users/logout", { email: user?.email })
      .then((res) => {
        console.log(res.data.message);
        logout();
        localStorage.removeItem("token");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="dropdown dropdown-end">
        <label tabIndex={0}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 sm:w-4 sm:h-4 md:w-6 md:h-6 hover:border-b-[1px] hover:border-white"
            onClick={openModal}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 my-[1.425rem] shadow bg-[#000000f1] rounded-b-box w-52"
        >
          <p>{user?.name}</p>
          <li>
            <a onClick={sendLogout}>Logout</a>
          </li>
        </ul>
      </div>
    </>
  );
}
