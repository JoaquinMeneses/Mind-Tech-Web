import React, { useState, useRef, useEffect } from "react";
import NavBar from "../components/NavBar";
import useStore from "../store/store";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import axios from "axios";
import { Link } from "react-router-dom";
import Chart from "../components/Chart";
import LineChart from "../components/LineChart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminPanel({ allProducts, getAllProducts }) {
  //declaracion de variables para setear estados:
  const { deleteProducts } = useStore();
  const createProduct = useStore((state) => state.createProduct);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [currentDiv, setCurrentDiv] = useState(1);
  const [categories, setCategories] = useState();
  const [brands, setBrands] = useState();
  const [selectedOption, setSelectedOption] = useState("");
  const [idSelected, setIdSelected] = useState("");
  const [statics, setStatics] = useState(1);
  const [shipments, setShip] = useState(1);
  const [selectedShip, setSelectedShip] = useState("");
  const [showForm, setShowForm] = useState(false);

  //variables para capturar datos en crear un producto nuevo:
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [images, setImages] = useState("");
  //variable que permite el uso de firebase en el componente
  const storage = getStorage(app);

  //productos que llegan de manera global para ser mapeados y consumir los datos del backend:
  useEffect(() => {
    if (!allProducts?.length) {
      getAllProducts();
    }
  }, []);

  //funciones para llenar los inputs con los datos del producto seleccionado:
  const handleProductChange = (e) => {
    const productName = e.target.value;
    const product = allProducts.find((item) => item.name === productName);
    setSelectedProduct(product);
  };

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if (selectedCheckboxes.includes(value)) {
      setSelectedCheckboxes(
        selectedCheckboxes.filter((item) => item !== value)
      );
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, value]);
    }
  };

  //creacion del data de nuevo producto y envio de datos al back
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Subir las imágenes al almacenamiento de Firebase y obtener sus URLs
    const uploadPromises = [];
    const imageUrls = [];

    for (let i = 0; i < images.length; i++) {
      const imageFile = images[i];
      const storageRef = ref(storage, `images/${imageFile.name}`);
      const uploadPromise = uploadBytes(storageRef, imageFile)
        .then(() => getDownloadURL(storageRef))
        .then((imageUrl) => {
          imageUrls.push(imageUrl);
        });

      uploadPromises.push(uploadPromise);
    }

    try {
      // Esperar a que se completen todas las cargas de imágenes
      await Promise.all(uploadPromises);

      // Crear el objeto newProduct con las URLs de las imágenes
      const newProduct = {
        name,
        description,
        brand,
        category,
        price,
        quantity,
        images: imageUrls,
      };

      // Llamar a la función createProduct en el almacén de Zustand
      const res = await createProduct(newProduct);
      setName("");
      setDescription("");
      setBrand("");
      setCategory("");
      setPrice("");
      setQuantity(0);
      setImages(null);
      getAllProducts();
      console.log(res, "Producto creado");
      console.log(newProduct);
    } catch (err) {
      console.log(err)
    } 
  };

  //funcion para mostrar los datos de un producto a editar:

  const handleEdit = (e) => {
    e.preventDefault();
    const editProductName = e.target.value;
    const editProduct = allProducts.find(
      (product) => product.name === editProductName
    );
    setEditProduct(editProduct);
    setIdSelected(e.target.value);
  };

  //funcion para enviar la solicitud al back para editar un producto
  const handleEditProduct = (e) => {
    e.preventDefault();

    // Subir las imágenes al almacenamiento de Firebase y obtener sus URLs
    const uploadPromises = [];
    const imageUrls = [];

    for (let i = 0; i < images.length; i++) {
      const imageFile = images[i];
      const storageRef = ref(storage, `images/${imageFile.name}`);
      const uploadPromise = uploadBytes(storageRef, imageFile)
        .then(() => getDownloadURL(storageRef))
        .then((imageUrl) => {
          imageUrls.push(imageUrl);
        });

      uploadPromises.push(uploadPromise);
    }

    try {
      // Esperar a que se completen todas las cargas de imágenes
      Promise.all(uploadPromises);

      // Crear el objeto newProduct con las URLs de las imágenes
      const updateProduct = {
        name,
        description,
        brand,
        category,
        price,
        quantity,
        images: imageUrls,
      };
      axios
        .put(
          `http://localhost:3000/products/update/${idSelected}`,
          updateProduct
        )
        .then(console.log("producto actualizado", updateProduct))
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {}
  };

  //captura de id para aplicar el delete a un/varios producto/os:
  function handleDelete(e) {
    e.preventDefault();
    let dataDelete = {
      data: {
        selectedCheckboxes,
      },
    };
    deleteProducts(dataDelete) // Llama a la función deleteProducts pasando los datos
      .then(() => {
        getAllProducts();
        console.log("borrado con exito");
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(dataDelete);
  }

  //funciones para renderizar pantallas de create product
  const oneClick = () => {
    setCurrentDiv(1);
  };
  const handleOneClick = () => {
    setCurrentDiv(2);
  };
  const handleTwoClick = () => {
    setCurrentDiv(3);
  };
  //funciones para renderizar componentes de statics

  const handleBars = () => {
    setStatics(1);
  };
  const handleLine = () => {
    setStatics(2);
  };
  //funcion para renderizar componentes de shipments
  const handleUserShip = () => {
    setShip(1);
  };

  const handleShip = () => {
    setShip(2);
  };

  //funcion para incrementar la cantidad de productos
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  //funcion para renderizar new category or select existing category
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  //axios para traer las categorias:
  useEffect(() => {
    axios
      .get("http://localhost:3000/categories")
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //axios para traer las marcas(brand):
  useEffect(() => {
    axios
      .get("http://localhost:3000/brands")
      .then((response) => {
        setBrands(response.data.brands);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleOptionChanged = (event) => {
    const selectedValue = event.target.value;
    setSelectedShip(selectedValue);

    // Si se selecciona "Delivery by Mercado Envios", mostrar el formulario
    if (selectedValue === "Delivery by Mercado Envios") {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  };

  const data = [
    "entrega pendiente",
    "entrega pendiente",
    "entrega pendiente",
    "entrega pendiente",
  ];

  return (
    <>
      <NavBar />
      <div className="w-full h-[10vh] bg-black"></div>
      <div className="flex flex-col w-full min-h-[100vh] bg-white ">
        <div className=" min-h-[70vh] w-full flex flex-col">
          <div className="w-[100%]  min-h-[100vh]  flex flex-col items-center justify-around">
            {/*Div contenedor del apartado create product, el condicional maneja los estados para renderizar las vistas*/}

            {currentDiv === 1 && (
              
              <form
                onSubmit={handleSubmit}
                className="w-[90%] p-2 min-h-[90vh] mt-4 flex flex-col items-center pl-2 justify-around bg-[#0000000e] text-black shadow-md shadow-[#000000a8] rounded-[15px] sm:w-[70%]  md:w-[50%] "
                action=""
              >
                <ToastContainer position="top-right" />
                <p className="font-bold w-[40%]  h-[6vh] py-3 rounded-[10px] text-center   font-montserrat  text-[14px]">
                  Create new product
                </p>
                <input
                  placeholder="Product name"
                  className="h-[5vh] w-[95%] bg-[#d6d6d6] rounded-[5px] placeholder:pl-2"
                  type="text"
                  name=""
                  id=""
                  onChange={(e) => setName(e.target.value.toUpperCase())}
                />
                <textarea
                  placeholder="Description"
                  className="bg-[#d6d6d6] rounded-[3px] resize-none w-[95%]"
                  rows={5}
                  cols={35}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <select
                  className="w-[95%] h-[5vh] pl-2 text-[#4c4c4c66] font-medium rounded-[5px] bg-[#9797974e]  "
                  onChange={(e) => setBrand(e.target.value)}
                  name="select"
                >
                  <option value="" disabled selected hidden>
                    Select existing brand
                  </option>
                  {brands?.map((item, index) => (
                    <option value={item._id}>{item.name}</option>
                  ))}
                </select>
                <div className="h-[7vh] w-[95%] bg-transparent rounded-[5px] text-[#4c4c4c66] flex justify-around font-montserrat items-center font-bold">
                  <Link
                    className="bg-[#35b1164c] cursor-pointer p-2 rounded-[10px]"
                    onClick={() => handleOptionChange("new")}
                  >
                    Insert new category
                  </Link>
                  <Link
                    className="bg-[#1625b14c] cursor-pointer p-2 rounded-[10px]"
                    onClick={() => handleOptionChange("existing")}
                  >
                    Select existing category
                  </Link>
                </div>

                {selectedOption === "new" ? (
                  <input
                    placeholder="Insert new category"
                    className="h-[5vh] w-[95%] bg-[#d6d6d6] rounded-[5px] placeholder:pl-2"
                    type="text"
                    name=""
                    id=""
                    value=""
                    onChange={(e) => setPrice(e.target.value)}
                  />
                ) : (
                  <select
                    className="w-[95%] h-[5vh] pl-2 text-[#4c4c4c66] font-medium rounded-[5px] bg-[#9797974e]"
                    onChange={(e) => setCategory(e.target.value)}
                    name="select"
                  >
                    <option value="" disabled selected hidden>
                      Select existing category
                    </option>
                    {categories?.map((item, index) => (
                      <option value={item._id}>{item.name}</option>
                    ))}
                  </select>
                )}
                <input
                  placeholder="Insert price"
                  className="h-[5vh] w-[95%]  bg-[#d6d6d6] rounded-[5px] placeholder:pl-2"
                  type="text"
                  name=""
                  id=""
                  onChange={(e) => setPrice(e.target.value)}
                />
                <div className=" flex flex-col h-[10vh] w-[95%]  rounded-[5px] bg-[#9797974e]">
                  <p className="font-medium text-[#4c4c4c66] pl-2">Quantity:</p>
                  <div className="w-[full]  flex justify-evenly">
                    {quantity === 0 ? (
                      <div className="w-6 h-6"></div>
                    ) : (
                      <svg
                        onClick={handleDecrease}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className=" w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19.5 12h-15"
                        />
                      </svg>
                    )}
                    <input
                      className="h-[5vh] w-[20%]  bg-[#fff] rounded-[5px] placeholder:pl-2 font-bold text-center"
                      type="number"
                      value={quantity}
                      name=""
                      id=""
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                    <svg
                      onClick={handleIncrease}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </div>
                </div>
                <div className="w-[95%] h-[10vh]">
                  <p className="font-medium text-[#4c4c4c66]">
                    Insert 3 images:
                  </p>
                  <input
                    multiple
                    className="h-[5vh] w-[95%] bg-[#d6d6d6] rounded-[5px] placeholder:pl-2"
                    type="file"
                    name=""
                    id=""
                    onChange={(e) => setImages(e.target.files)}
                  />
                </div>
                <button
                  className="w-[40vw] h-[5vh] rounded-[10px] bg-black"
                  type="submit"
                >
                  <p className="text-white font-bold tracking-[2px]">Create</p>
                </button>
              </form>
            )}

            {/*Div contenedor del apartado edit product */}

            {currentDiv === 2 && (
              <form
                onSubmit={handleEditProduct}
                className="w-[90%] p-2 min-h-[110vh] mt-4 flex flex-col items-center pl-2 justify-around bg-[#0000000e] text-black shadow-md shadow-[#000000a8] rounded-[15px] sm:w-[70%]  md:w-[50%] "
                action=""
              >
                <p className="font-bold w-[40%] h-[6vh] py-3 rounded-[10px] text-center   font-montserrat text-[14px]">
                  Edit a product
                </p>
                <select
                  className="w-[95%] h-[5vh] pl-2 text-[#4c4c4c66] font-medium rounded-[5px] bg-[#9797974e]  "
                  onChange={handleEdit}
                  name="select"
                >
                  <option value="" disabled selected hidden>
                    Choose the product to edit
                  </option>
                  <option value="">None</option>
                  {allProducts.map((item, index) => (
                    <option className="w-[95%]" value={item._id}>
                      {" "}
                      {item.name}{" "}
                    </option>
                  ))}
                </select>
                <div className="w-full h-[8vh] flex justify-center items-center">
                  <p className="font-bold font-montserrat">Product to edit</p>{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 ml-2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                </div>
                <input
                  placeholder="Insert the new product name"
                  className="h-[5vh] w-[95%] bg-[#d6d6d6] p-2 rounded-[5px] placeholder:pl-2"
                  value={name}
                  type="text"
                  name=""
                  id=""
                  onChange={(e) => setName(e.target.value)}
                />
                <textarea
                  placeholder="Insert the new description"
                  className="bg-[#d6d6d6] rounded-[3px] p-2 resize-none w-[95%]"
                  value={description}
                  rows={5}
                  cols={35}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <select
                  className="w-[95%] h-[5vh] pl-2 text-[#4c4c4c66] font-medium rounded-[5px] bg-[#9797974e]  "
                  onChange={(e) => setBrand(e.target.value)}
                  name="select"
                >
                  <option value="" disabled selected hidden>
                    Select existing brand
                  </option>
                  {brands?.map((item, index) => (
                    <option value={item._id}>{item.name}</option>
                  ))}
                </select>
                <div className="h-[7vh] w-[95%] bg-transparent rounded-[5px] text-[#4c4c4c66] flex justify-around font-montserrat items-center font-bold">
                  <Link
                    className="bg-[#35b1164c] cursor-pointer p-2 rounded-[10px]"
                    onClick={() => handleOptionChange("new")}
                  >
                    Insert new category
                  </Link>
                  <Link
                    className="bg-[#1625b14c] cursor-pointer p-2 rounded-[10px]"
                    onClick={() => handleOptionChange("existing")}
                  >
                    Select existing category
                  </Link>
                </div>

                {selectedOption === "new" ? (
                  <input
                    placeholder="Insert new category"
                    className="h-[5vh] w-[95%] bg-[#d6d6d6] rounded-[5px] placeholder:pl-2"
                    type="text"
                    name=""
                    id=""
                    value=""
                    onChange={(e) => setPrice(e.target.value)}
                  />
                ) : (
                  <select
                    className="w-[95%] h-[5vh] pl-2 text-[#4c4c4c66] font-medium rounded-[5px] bg-[#9797974e]"
                    onChange={(e) => setCategory(e.target.value)}
                    name="select"
                  >
                    <option value="" disabled selected hidden>
                      Select existing category
                    </option>
                    {categories?.map((item, index) => (
                      <option value={item._id}>{item.name}</option>
                    ))}
                  </select>
                )}
                <input
                  placeholder="Insert the new price"
                  className="h-[5vh] w-[95%]  bg-[#d6d6d6] p-2 rounded-[5px] placeholder:pl-2"
                  type="text"
                  name=""
                  id=""
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <div className=" flex flex-col h-[10vh] w-[95%]  rounded-[5px] bg-[#9797974e]">
                  <p className="font-medium text-[#4c4c4c66] pl-2">
                    Insert the new quantity:
                  </p>
                  <div className="w-[full]  flex justify-evenly">
                    {quantity === 0 ? (
                      <div className="w-6 h-6"></div>
                    ) : (
                      <svg
                        onClick={handleDecrease}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className=" w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19.5 12h-15"
                        />
                      </svg>
                    )}
                    <input
                      className="h-[5vh] w-[20%]  bg-[#fff] rounded-[5px] placeholder:pl-2 font-bold text-center"
                      type="number"
                      value={quantity}
                      name=""
                      id=""
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                    <svg
                      onClick={handleIncrease}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </div>
                </div>
                <div className="w-[95%] h-[14vh] flex flex-col justify-evenly">
                  <p className="font-medium text-[#4c4c4c66]">
                    Insert the new images:
                  </p>
                  <p className="font-medium text-[#d23333]">
                    For security reasons, please reload your images.
                  </p>
                  <input
                    multiple
                    className="h-[5vh] w-[95%] bg-[#d6d6d6] rounded-[5px] placeholder:pl-2"
                    type="file"
                    name=""
                    id=""
                    onChange={(e) => setImages(e.target.files)}
                  />
                </div>
                <button
                  className="w-[40vw] h-[5vh] rounded-[10px] bg-black"
                  type="submit"
                >
                  <p className="text-white font-bold tracking-[2px]">Edit</p>
                </button>
              </form>
            )}

            {/*Div contenedor del apartado delete product */}

            {currentDiv === 3 && (
              <form
                onSubmit={handleDelete}
                className="w-[90%] p-2 min-h-[90vh] mt-4 flex flex-col items-center pl-2 justify-around bg-[#0000000e] text-black shadow-md shadow-[#000000a8] rounded-[15px] sm:w-[70%]  md:w-[60%] "
                action=""
              >
                <p className="font-bold w-[60%] h-[6vh] py-3 rounded-[10px] text-center   font-montserrat  text-[14px]">
                  Delete a product
                </p>
                <div className="w-[95%] h-[80vh] cursor-pointer p-2 py-4 overflow-auto flex flex-col justify-start">
                  {allProducts.map((item) => (
                    <label
                      onClick={() => {
                        const checkbox = document.getElementById(item._id);
                        checkbox.checked = !checkbox.checked;
                      }}
                      className="flex w-[95%] m-1 p-1 bg-[#9797974e] rounded-[5px]  h-[8vh]  md:text-[12px] text-[10px] border border-black justify-start items-center"
                      htmlFor={item._id}
                      key={item._id}
                    >
                      <input
                        onChange={handleCheckboxChange}
                        id={item._id}
                        value={item._id}
                        type="checkbox"
                      />
                      <div className="pl-2 font-montserrat">{item.name}</div>
                    </label>
                  ))}
                </div>
                <button
                  className="w-[40vw] mt-4 h-[5vh] rounded-[10px] bg-black"
                  type="submit"
                >
                  <p className="text-white font-bold tracking-[2px]">Delete</p>
                </button>
              </form>
            )}

            {/*Div contenedor de los botones para interfaz de products, las funciones onClick renderizan las vistas */}

            <div className="mt-4 mb-4 w-[90%] h-[5vh] flex items-center justify-evenly  sm:w-[70%]  md:w-[50%]">
              <div
                onClick={oneClick}
                className="flex justify-center  items-center w-[15vw] h-[7vh] bg-[#000000ce] rounded-[15px] cursor-pointer shadow-md shadow-[#000000a6] hover:scale-[.9]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div
                onClick={handleOneClick}
                className="flex justify-center items-center w-[15vw] h-[7vh] bg-[#000000ce] rounded-[15px] cursor-pointer shadow-md shadow-[#000000a6] hover:scale-[.9]"
              >
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </div>
              <div
                onClick={handleTwoClick}
                className="flex justify-center items-center w-[15vw] h-[7vh] bg-[#000000ce] rounded-[15px] cursor-pointer shadow-md shadow-[#000000a6] hover:scale-[.9]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/*Div contenedor del apartado stock & stats */}

          <div className="w-[100%] h-[70vh]  sm:min-h-[90vh] flex flex-col items-center justify-around">
            <p className="font-bold text-[#050505] text-[20px] tracking-[2px]">
              Stats
            </p>
            {statics === 1 && (
              <div className="w-[100%] h-[50vh] sm:h-[50vh] md:h-[90vh] lg:w-[80%] lg:h-[70vh] flex flex-col items-center justify-around">
                <p className="font-bold text-[#000000bf] tracking-[2px]">
                  Monthly revenues
                </p>
                <div className="w-[90%] h-full  bg-[#0000000e]  shadow-md  shadow-[#000000a8] rounded-[15px] flex justify-center items-center">
                  <LineChart />
                </div>
              </div>
            )}

            {statics === 2 && (
              <div className="w-[100%] h-[50vh] sm:h-[50vh] md:h-[90vh] lg:w-[80%] lg:h-[70vh] flex flex-col items-center justify-around">
                <p className="font-bold text-[#000000bf] tracking-[2px]">
                  User interactions
                </p>
                <div className="w-[90%] h-full  bg-[#0000000e]  shadow-md  shadow-[#000000a8] rounded-[15px] flex justify-center items-center">
                  <Chart />
                </div>
              </div>
            )}

            <div className="mt-4 mb-4 w-[90%] h-[5vh] flex items-center justify-evenly sm:w-[70%]  md:w-[50%]">
              <div
                onClick={handleBars}
                className="flex justify-center items-center w-[15vw] h-[7vh] bg-[#000000ce] rounded-[15px] cursor-pointer shadow-md shadow-[#000000a6] hover:scale-[.9]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                  />
                </svg>
              </div>
              <div
                onClick={handleLine}
                className="flex justify-center items-center w-[15vw] h-[7vh] bg-[#000000ce] rounded-[15px] cursor-pointer shadow-md shadow-[#000000a6] hover:scale-[.9]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/*Div contenedor del apartado shipments */}

        <div className="w-full min-h-[80vh] bg-white flex flex-col items-center justify-evenly">
          <p className="font-bold text-[#000000cb] py-4">Manage Shipments</p>
          {shipments === 1 && (
            <div className="w-[90%] min-h-[40vh]  lg:w-[80%] rounded-[15px] shadow-md shadow-black  bg-white flex flex-col items-center justify-around">
              <div
                action=""
                className="border overflow  w-[90%] h-full flex flex-col items-center justify-start"
              >
                <p className="py-2 font-montserrat font-bold ">
                  Choose the shipping method
                </p>
                <select
                  onChange={handleOptionChanged}
                  className="w-[95%] h-[5vh] pl-2 text-[#4c4c4c66] font-medium rounded-[5px] bg-[#9797974e]  "
                  name=""
                  id=""
                >
                  <option value="">Select an option</option>
                  <option value="">Branch delivery</option>
                  <option value="Delivery by Mercado Envios">
                    Delivery by Mercado Envios
                  </option>
                </select>
                {showForm === false && (
                  <form className="w-[90%] p-2 min-h-[40vh] mt-4 flex flex-col items-center pl-2 justify-around bg-[#0000000e] text-black   sm:w-[70%]  md:w-[50%] ">
                    <p className="font-semibold">
                      Information to pick up the package:
                    </p>
                    <input
                      placeholder="Last and First name"
                      className="h-[5vh] w-[95%] bg-[#d6d6d6] rounded-[5px] placeholder:pl-2"
                      type="text"
                    />
                    <input
                      placeholder="DNI"
                      className="h-[5vh] w-[95%] bg-[#d6d6d6] rounded-[5px] placeholder:pl-2"
                      type="text"
                    />
                    <input
                      placeholder="Purchase Receipt"
                      className="h-[5vh] w-[95%] bg-[#d6d6d6] rounded-[5px] placeholder:pl-2"
                      type="text"
                    />
                    <button className="w-[40%] h-[6vh] rounded-[15px] text-white bg-black">
                      Delivered
                    </button>
                  </form>
                )}
                {showForm && (
                  <form
                    className="w-[90%] p-2 min-h-[90vh] mt-4 flex flex-col items-center pl-2 justify-around bg-[#0000000e] text-black   sm:w-[70%]  md:w-[50%] "
                    action=""
                  >
                    <p>Sender's data:</p>
                    <input
                      placeholder="Name"
                      className="h-[5vh] w-[95%] bg-[#d6d6d6] rounded-[5px] placeholder:pl-2"
                      type="text"
                    />
                    <input
                      placeholder="Address"
                      className="h-[5vh] w-[95%] bg-[#d6d6d6] rounded-[5px] placeholder:pl-2"
                      type="text"
                    />
                    <input
                      placeholder="Email"
                      className="h-[5vh] w-[95%] bg-[#d6d6d6] rounded-[5px] placeholder:pl-2"
                      type="text"
                    />
                    <input
                      placeholder="Phone Number"
                      className="h-[5vh] w-[95%] bg-[#d6d6d6] rounded-[5px] placeholder:pl-2"
                      type="text"
                    />
                    <p>Receiver's data:</p>
                    <input
                      placeholder="Name"
                      className="h-[5vh] w-[95%] bg-[#d6d6d6] rounded-[5px] placeholder:pl-2"
                      type="text"
                    />
                    <input
                      placeholder="Address"
                      className="h-[5vh] w-[95%] bg-[#d6d6d6] rounded-[5px] placeholder:pl-2"
                      type="text"
                    />
                    <input
                      placeholder="Email"
                      className="h-[5vh] w-[95%] bg-[#d6d6d6] rounded-[5px] placeholder:pl-2"
                      type="text"
                    />
                    <input
                      placeholder="Phone Number"
                      className="h-[5vh] w-[95%] bg-[#d6d6d6] rounded-[5px] placeholder:pl-2"
                      type="text"
                    />
                    <p>Package information:</p>
                    <input
                      placeholder="Weigth"
                      className="h-[5vh] w-[95%] bg-[#d6d6d6] rounded-[5px] placeholder:pl-2"
                      type="text"
                    />
                    <input
                      placeholder="Dimensions"
                      className="h-[5vh] w-[95%] bg-[#d6d6d6] rounded-[5px] placeholder:pl-2"
                      type="text"
                    />
                  </form>
                )}
              </div>
            </div>
          )}
          {shipments === 2 && (
            <div className="w-[90%] min-h-[50vh] sm:h-[50vh] md:h-[90vh] lg:w-[80%] rounded-[15px] shadow-md shadow-black lg:h-[70vh] bg-white flex flex-col items-center justify-around">
              <div className="w-[90%] min-h-[60vh]  flex flex-col items-center ">
                <p className="py-2 font-montserrat font-bold ">
                Pending shipments:
                </p>
                <table className="border flex flex-col rounded-[10px] p-4 bg-[#d6d6d681]  w-[90%] h-[50%] ">
                  {data.map((item, index) => (
                    <tr className="border m-[2px] py-2 pl-1 rounded-[4px] bg-[#d6d6d6] border-[#0000007d]">
                      {item}
                    </tr>
                  ))}
                </table>
                <p className="py-2 font-montserrat font-bold ">Deliveries made:</p>
                <table className="border flex flex-col p-4 rounded-[10px] bg-[#d6d6d681] w-[90%] h-[50%] ">
                  {data.map((item, index) => (
                    <tr className="border m-[2px] py-2 pl-1 rounded-[4px] bg-[#d6d6d6] border-[#0000007d]">
                      {item}
                    </tr>
                  ))}
                </table>
              </div>
            </div>
          )}
          <div className="mt-4 mb-4 w-[90%] h-[5vh] flex items-center justify-evenly sm:w-[70%]  md:w-[50%]">
            <div
              onClick={handleUserShip}
              className="flex justify-center items-center w-[20vw] h-[6vh] bg-[#000000ce] rounded-[15px] cursor-pointer shadow-md shadow-[#000000a6] hover:scale-[.9]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                />
              </svg>
            </div>
            <div
              onClick={handleShip}
              className="flex flex-col justify-center items-center w-[20vw] h-[6vh] bg-[#000000ce] rounded-[15px] cursor-pointer shadow-md shadow-[#000000a6] hover:scale-[.9]"
            >
              {data.length > 1 && (
                <p className="absolute mb-14 font-bold text-[16px] p-[3px] rounded-b-[50px] bg-[#363f86]  text-[#ffffff]">
                  {data.length}
                </p>
              )}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
