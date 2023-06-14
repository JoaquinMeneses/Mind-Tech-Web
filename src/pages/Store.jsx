import React, { useState, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import NavBar from "../components/NavBar";
import CardStore from "../components/CardStore";
import axios from "axios";
import apiUrl from "../../api";

import useStore from "../store/store";

export default function Store() {
  const { allProducts, getAllProducts } = useStore();
  const [favorite, setFavorites] = useState([]);
  
  // store all products
  useEffect(() => {
    if (!allProducts?.length) {
      getAllProducts();
    }
  }, []);
  const [menuFilter, setMenuFilter] = useState(false);
  const [menuSort, setMenuSort] = useState(false);
  const clickFilter = () => {
    setMenuFilter(!menuFilter);
  };
  const clickSort = () => {
    setMenuSort(!menuSort);
  };

  // get categories and brands
  const [categories, setCategories] = useState();
  const [brands, setBrands] = useState();

  useEffect(() => {
    Promise.all([axios(apiUrl + "categories"), axios(apiUrl + "brands")])
      .then(([a, b]) => {
        setCategories(a.data.categories);
        setBrands(b.data.brands);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // filters
  const animatedComponents = makeAnimated();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();

  useEffect(() => {
    Promise.all([axios(apiUrl + "categories"), axios(apiUrl + "brands")])
      .then(([categoriesRes, brandsRes]) => {
        setCategories(categoriesRes.data.categories);
        setBrands(brandsRes.data.brands);
      })
      .catch((err) => {
        console.error(err);
      });
    getAllProducts();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions.map((option) => option.value));
  };

  const handleBrandChange = (selectedOptions) => {
    setSelectedBrands(selectedOptions.map((option) => option.value));
  };

  const handleFilterChange = (selectedOption) => {
    setSelectedFilter(selectedOption);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value !== "" ? event.target.value : "");
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value !== "" ? event.target.value : "");
  };

  const filterOptions = [
    { value: "lowestPrice", label: "Lowest Price" },
    { value: "highestPrice", label: "Highest Price" },
  ];

  const sortProducts = (products, filterValue) => {
    switch (filterValue) {
      case "highestPrice":
        return products.slice().sort((a, b) => b.price - a.price);
      case "lowestPrice":
        return products.slice().sort((a, b) => a.price - b.price);
      default:
        return products;
    }
  };

  const filterProducts = (products) => {
    let filteredProducts = products;

    if (searchTerm.trim() !== "") {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedFilter) {
      filteredProducts = sortProducts(filteredProducts, selectedFilter.value);
    }

    if (selectedCategories.length) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    if (selectedBrands.length) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }

    const min =
      minPrice !== "" && !isNaN(minPrice)
        ? parseFloat(minPrice)
        : Math.min(...products.map((product) => product.price));
    const max =
      maxPrice !== "" && !isNaN(maxPrice)
        ? parseFloat(maxPrice)
        : Math.max(...products.map((product) => product.price));

    if (minPrice !== "" || maxPrice !== "") {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= min && product.price <= max
      );
    }

    return filteredProducts;
  };


  

console.log(favorite)
  

  
  const filteredProducts = filterProducts(allProducts);
  return (
    <div className="w-full min-h-[100vh] bg-[#ffffff] flex flex-col">
      <NavBar />
      <div className="w-full h-[10vh] bg-white"></div>
      {/* mobile hasta 640px */}
      <div className="w-[100%] sm:hidden min-h-[120vh] border border-black ">
        <div className="flex flex-col w-full  items-center ">
          <div className="w-full h-[15vh]  flex justify-around items-center">
            <div
              onClick={clickFilter}
              className="w-[45vw] h-[10vh] border flex justify-center items-center "
            >
              <p>Filters</p>
              <svg
                height="20"
                width="20"
                viewBox="0 0 20 20"
                aria-hidden="true"
                focusable="false"
                className="css-tj5bde-Svg"
              >
                <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
              </svg>
              {menuFilter && (
                <>
                  <div className="absolute w-[45vw] min-h-[30vh] top-[150px] bg-[#eeeeeef8] text-[#636262] ">
                    <div className="w-full min-h-[20vh] border border-[#727272a8] flex flex-col justify-around">
                      <Select
                        options={categories?.map((category) => ({
                          value: category._id,
                          label: category.name,
                        }))}
                        onChange={handleCategoryChange}
                        isMulti
                        placeholder="Categories:"
                        components={animatedComponents}
                      />
                      <Select
                        options={brands?.map((brand) => ({
                          value: brand._id,
                          label: brand.name,
                        }))}
                        onChange={handleBrandChange}
                        isMulti
                        placeholder="Brands:"
                        components={animatedComponents}
                      />
                    </div>
                    <div className="w-full h-[20vh] border border-[#727272a8] flex items-center flex-col justify-around">
                      <p>Price:</p>
                      <input
                        className="focus:outline-none w-[30vw] h-[8vh] bg-white border border-[#727272a8] p-2 "
                        type="number"
                        value={minPrice}
                        onChange={handleMinPriceChange}
                        placeholder="$Min"
                      />
                      <input
                        className="focus:outline-none w-[30vw] h-[8vh] bg-white border border-[#727272a8] p-2 "
                        type="number"
                        value={maxPrice}
                        onChange={handleMaxPriceChange}
                        placeholder="$Max"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
            <Select
              className="w-[45vw] h-[10vh] border flex justify-evenly items-center"
              onChange={handleFilterChange}
              options={filterOptions}
              value={selectedFilter}
              placeholder="Sort by"
              components={{
                ...animatedComponents,
                IndicatorSeparator: () => null,
                Control: ({ children, ...restProps }) => (
                  <div className="outline-none flex" {...restProps}>
                    {children}
                  </div>
                ), // Envuelve todo el contenido en un div interactivo
              }}
            />
          </div>
          <div className=" flex bg-[#9797974e] text-[#000000b9] items-center rounded-[15px] justify-evenly">
            <input
              className="w-[60vw] h-[5vh] placeholder:text-[#000000b9]  p-2 text-center bg-transparent focus:outline-none"
              type="search"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search"
            />
          </div>
        </div>
        <div className=" w-full min-h-[140vh] flex flex-col items-center justify-around">
          <CardStore allProducts={filteredProducts} />
        </div>
      </div>

      <div className="hidden sm:w-full sm:h-min-[100vh] sm:bg-[#ececec] sm:flex ">
        <div className="  sm:w-[30%] md:w-[25%] lg:w-[20%] xl:w-[18%] sm:h-full flex "></div>

        <div className="p-4 fixed text-[#00000083] sm:w-[30%] md:w-[25%] lg:w-[20%] xl:w-[18%] sm:h-full overflow-y-auto">
          <div className="flex flex-col items-center">
            <p className="font-medium">Filters:</p>
            <div className="w-full min-h-[10vh]  flex flex-col justify-around">
              <Select
                options={categories?.map((category) => ({
                  value: category._id,
                  label: category.name,
                }))}
                onChange={handleCategoryChange}
                isMulti
                placeholder="Categories:"
                components={animatedComponents}
              />
            </div>
            <div className="w-full min-h-[10vh]  flex flex-col justify-around">
              <Select
                options={brands?.map((brand) => ({
                  value: brand._id,
                  label: brand.name,
                }))}
                onChange={handleBrandChange}
                isMulti
                placeholder="Brands:"
                components={animatedComponents}
              />
            </div>
            <div className="w-full h-[20vh] flex flex-col items-center justify-center mb-4">
              <p className="font-medium mb-4">Price:</p>
              <div className="w-full flex justify-between items-center">
                <div className="flex flex-col">
                  <input
                    className="focus:outline-none w-[12vw] md:w-[10vw] lg:w-[8vw] h-[5vh] rounded-[5px] bg-white border border-[#727272a8]  mb-2"
                    type="number"
                    value={minPrice}
                    onChange={handleMinPriceChange}
                    placeholder="$Min"
                  />
                  {minPrice && (
                    <button
                      className="text-red-600"
                      onClick={() => setMinPrice("")}
                    >
                      Clear
                    </button>
                  )}
                </div>{" "}
                <div>
                  <input
                    className="focus:outline-none w-[12vw] md:w-[10vw] lg:w-[8vw] h-[5vh] rounded-[5px] bg-white border border-[#727272a8] p-2 mb-2"
                    type="number"
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                    placeholder="$Max"
                  />
                  {maxPrice && (
                    <button
                      className="text-red-600"
                      onClick={() => setMaxPrice("")}
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:w-[70%] md:w-[75%] lg:w-[80%] xl:w-[82%] sm:h-full flex flex-col  ">
          <div className="w-full h-[10vh]  flex"></div>
          <div className="w-full h-[10vh] bg-[#ececec] pr-[30vw] md:pr-[20vw] lg:pr-[15vw] flex justify-around items-center fixed">
            <div className="flex items-center justify-evenly  w-[30vw] h-[6vh] rounded-[15px]">
              <Select
                options={filterOptions}
                onChange={handleFilterChange}
                value={selectedFilter}
                placeholder="Sort by:"
                components={animatedComponents}
              />
            </div>

            <div className="flex items-center justify-evenly border border-blac  w-[20vw] h-[6vh] rounded-[15px]  text-[#00000083] bg-[#9797974e] ">
              <input
                className="bg-transparent p-2 placeholder:text-[#00000083]  w-[15vw] h-[6vh] rounded-[15px] focus:outline-none"
                type="search"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6  h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
          </div>
          <div className="w-full min-h-[90vh]  flex flex-col items-center border-l border-black ">
            <CardStore allProducts={filteredProducts}  />
          </div>
        </div>
      </div>
    </div>
  );
}


//handleFavorite={handleFavorite} removeFavorite={removeFavorite} 