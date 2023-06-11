import React, { useEffect } from "react";

export default function Demostration({
  allProducts,
  getAllProducts,
  oneProduct,
  getOneProduct,
  user,
  getUser,
  token,
  login,
  logout
}) {
  useEffect(() => {
    getAllProducts();
    getOneProduct("64835a355c2bd36e9a48d5e0");
    getUser("joakin@mt.com");
  }, []);

  const sendToken = () => {
    login("prueba1234");
  };

  const deleteToken = () => {
    logout();
  };

  console.log(allProducts);
  console.log(oneProduct);
  console.log(user);
  console.log(token);

  return (
    <div className="bg-black w-full h-screen text-white text-center flex justify-center gap-4">
      <div className="text-blue-600" id="products use an array">
        <h2>Products:</h2>
        <ul>
          {allProducts?.map((product, index) => (
            <li key={index}>{product._id}</li>
          ))}
        </ul>
      </div>

      <div className="text-red-600" id="product use a object">
        <h2>Product:</h2>
        {oneProduct && (
          <div>
            <p>{oneProduct.name}</p>
          </div>
        )}
      </div>

      <div className="text-yellow-600" id="user use a object">
        <h2>User:</h2>
        {user && (
          <div>
            <p>{user._id}</p>
          </div>
        )}
      </div>

      <div className="text-orange-600" id="token use a object">
        <h2>Token:</h2>
        {user && (
          <div>
            <button onClick={sendToken}>Login</button>
            <p>{token}</p>
            <button onClick={deleteToken}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}
