import React, { useEffect } from "react";
import { useTrail, animated } from "react-spring";
import CardStore from "../components/CardStore";

export default function Demostration({
  allProducts,
  getAllProducts,
  oneProduct,
  getOneProduct,
  user,
  getUser,
  token,
  login,
  logout,
}) {
  useEffect(() => {
    getAllProducts();
    getOneProduct("64879ececa4be7eb46d3acdc");
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

  // Configura las animaciones utilizando React Spring
  const trail = useTrail(allProducts.length, {
    from: { opacity: 0, y: -100 },
    to: { opacity: 1, y: 0 },
    config: { mass: 1, tension: 200, friction: 20 },
  });

  return (
    <div className="bg-black w-full h-screen text-white text-center flex justify-center gap-4">
      <div className="text-blue-600" id="products">
        <h2>Products:</h2>
        {trail.map((style, index) => (
          <animated.div key={index} style={style}>
            <CardStore allProducts={allProducts} />
          </animated.div>
        ))}
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
