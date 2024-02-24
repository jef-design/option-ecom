import {create} from "zustand";

const localAdmin = localStorage.getItem("admin");
const localUser = localStorage.getItem("user");
const localCart = localStorage.getItem("cart");

let dataParsed: string;
let localCartData: string;

if (localCart) {
    localCartData = JSON.parse(localCart);
}

if (localAdmin) {
    dataParsed = JSON.parse(localAdmin);
}

if (localUser) {
    dataParsed = JSON.parse(localUser);
}

interface UserStore {
    admin: any;
    user: any;
    cart: any,
    setAdminCredentials: (adminInfo: any) => void;
    setUserCredentials: (userInfo: any) => void;
    setCart: (carts: any) => void;
    setLogOut: () => void; 
}

const useStore = create<UserStore>(set => ({
    admin: dataParsed ? dataParsed : null,
    user: dataParsed ? dataParsed : null,
    cart: localCartData ? localCartData : [],

    setAdminCredentials: adminInfo =>
        set(() => {
            localStorage.setItem("admin", JSON.stringify(adminInfo));
            return {admin: adminInfo};
        }),
        setUserCredentials: userInfo =>
        set(() => {
            localStorage.setItem("user", JSON.stringify(userInfo));
            return {user: userInfo};
        }),
        setCart: (cartData) =>
        set((state) => {
          const updatedCart = [...state.cart, cartData]; // Add the new item to the existing cart
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          return { cart: updatedCart }; // Update the cart property with the new cart
        }),
    setLogOut: () =>
        set(() => {
            localStorage.removeItem("admin");
            localStorage.removeItem("user");
            return {
                admin: null,
                user: null
            };
        }),
}));

export default useStore;
