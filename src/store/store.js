import { create } from "zustand";
import axios from "axios";
import apiUrl from "../../api";

const useStore = create((set) => ({
  allProducts: [],
  getAllProducts: async () => {
    try {
      const response = await axios.get(apiUrl + "products/all");
      set({ allProducts: response.data.products });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
  oneProduct: [],
  getOneProduct: async (id) => {
    try {
      const response = await axios.get(apiUrl + "products/one?one=" + id);
      set({ oneProduct: response.data.product });
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  },
  token: localStorage.getItem("token"),
  user: undefined,
  getUser: async (user) => {
    try {
      const response = await axios.get(apiUrl + "users/one?one=" + user);
      set({ user: response.data.user });
      localStorage.setItem("user", JSON.stringify(response.data.user));
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  },

  login: async (token) => {
    try {
      set({ token: token });
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  },
  logout: async () => {
    try {
      set({ token: undefined });
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  },
  selectCheckboxes: [],
  setSelectCheckboxes: (checkboxes) =>
    set((state) => ({
      selectCheckboxes: checkboxes,
    })),
  deleteProducts: async (dataDelete) => {
    try {
      await axios.delete(`${apiUrl}products/delete`, dataDelete);
      console.log("borrado con exito");
    } catch (err) {
      console.log(err);
    }
  },
  createProduct: async (newProduct) => {
    try {
      const response = await axios.post(
        `${apiUrl}products/create`,
        newProduct,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      
      console.log(error.response)
      
    }
  },
  cart: undefined,
  setCart: (parametro) => set({ cart: parametro }),
  favorites: [],
  handleFavorite: (itemId, itemName) => {
    set((state) => {
      if (state.favorites.some((fav) => fav._id === itemId)) {
        return {
          favorites: state.favorites.filter((fav) => fav.id !== itemId),
        };
      } else {
        return {
          favorites: [...state.favorites, { _id: itemId, name: itemName }],
        };
      }
    });
    axios
      .post(`${apiUrl}products/rating`, { _id: itemId, name: itemName })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Failed to add/remove favorite");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },

  removeFavorite: (id) => {
    set((state) => ({
      favorites: state.favorites.filter((fav) => fav.id !== id),
    }));
  },
<<<<<<< HEAD
=======

>>>>>>> 029a8c63d6fa995bd2f4c27188743c85773f694e
  formatPrice: (price) => {
    if (typeof price === "number") {
      return price.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } else {
      return "";
    }
  },
}));

export default useStore;
