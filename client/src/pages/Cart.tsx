import {useState, useMemo} from "react";
import Header from "../admin/layout/Header";
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {PlusSmallIcon, MinusSmallIcon, TrashIcon} from "@heroicons/react/24/outline";
import axiosInstance from "../services/axiosInstance";
import {RotatingLines} from "react-loader-spinner";
import EmptyCart from "./EmptyCart";
import {useNavigate, useParams} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import useStore from "../services/useStore";
import { TailSpin } from "react-loader-spinner";

const Cart = () => {
    const [quantity, setQuantity] = useState(1);
    const [checked, setChecked] = useState<any>({});
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [checkAll, setCheckAll] = useState(false);
    const params = useParams<any>();
    const {user} = useStore();

    const {data: cartsData} = useQuery({
        queryKey: ["getcart"],
        queryFn: () => axiosInstance.get("/api/products/cart").then(res => res.data),
    });
    console.log(cartsData)
    const totalSum = useMemo(
        () =>
            Object.entries(checked).reduce((accumulator, [cartId, value]) => {
                if (value) {
                    const cart = cartsData.items?.find((item: any) => item.product_id?._id + "" === cartId);

                    if (cart) {
                        return accumulator + cart.product_id.price * quantity;
                    }
                }
                return accumulator;
            }, 0),
        [checked, cartsData, quantity]
    );
    //cart remove
    const cartremoveHandler = async (cartRemove: any) => {
        const response = await axiosInstance.patch(`/api/products/cart/${params.id}`, cartRemove);
        console.log(response);
        return response.data;
    };

    const {mutate, isLoading} = useMutation({
        mutationFn: cartremoveHandler,
        mutationKey: ["cartremove"],
        onSuccess: cartRemove => {
            console.log(cartRemove);
            queryClient.invalidateQueries(["getcart"]);
        },
    });
    const removeCart = (cartId: any) => {
        console.log(cartId);
        const cartRemove = {customer_id: cartsData.customer_id, _id: cartId};
        mutate(cartRemove);
    };
    //checkout
    const {mutate: mutateCheckOut, isLoading: checkOutLoader} = useMutation({
        mutationFn: (checkOutInfo: any) =>
            axiosInstance.post(`/api/order/check-out`, checkOutInfo).then(res => res.data),
        mutationKey: ["check-out"],
        onSuccess: checkOutInfo => {
            navigate("/product/place-order");
            console.log(checkOutInfo);
        },
    });
    const CheckOutHandler = (totalAmount: number) => {
        const checkOutInfo = {customer_id: user._id, items: cartsData?.items, total_amount: totalAmount};
        mutateCheckOut(checkOutInfo);
        // if(Object.keys(checked).length === 0){
        //   return toast('No Cart Item Selected')

        // }
        //  else{
        //   const checkOutInfo= {customer_id: user._id,items: cartsData?.items,total_amount: totalAmount}
        //   mutateCheckOut(checkOutInfo)
        // }
    };
    const toggleCheckAll = () => {
        setCheckAll(!checkAll);
        const newChecked: any = {}; // New object to store checkbox values
        if (!checkAll) {
            // If "Check All" is checked, check all other checkboxes
            cartsData.forEach((cart: any) => {
                newChecked[cart._id] = true;
            });
        }
        setChecked(newChecked); // Update the state with the new checkbox values
    };

    //formatter amount
    const options = {maximumFractionDigits: 2};
    const formattedNumber = (num: any) => {
        return Intl.NumberFormat("en-US", options).format(num);
    };
    return (
        <div>
            <Header />
            <main className="main-container">
                {(cartsData?.items.length === 0 || !cartsData) ? (
                    <EmptyCart />
                ) : (
                    <div className="flex flex-col gap-3 relative">
                        {isLoading && (
                            <div className="flex justify-center">
                                <RotatingLines
                                    strokeColor="grey"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    width="40"
                                    visible={true}
                                />
                            </div>
                        )}
                        {cartsData?.items.map((cart: any) => {
                            const {product_name, images, price, _id} = cart.product_id;

                            return (
                                <div className="border px-3 py-5 shadow-sm" key={_id}>
                                    <div className="flex gap-4 justify-between">
                                        <div className="flex gap-4 items-center">
                                            <div className="self-center">
                                                <input
                                                    checked={cart.checked}
                                                    defaultChecked={!!checked[_id]}
                                                    onChange={() => {
                                                        setChecked({
                                                            ...checked,
                                                            [_id]: !checked[_id],
                                                        });
                                                    }}
                                                    className="h-5 w-5 cursor-pointer"
                                                    type="checkbox"
                                                    name=""
                                                    id=""
                                                />
                                            </div>
                                            <div>
                                                {images?.slice(0, 1).map((image: any) => {
                                                    return (
                                                        <div key={image.public_id} className="mb-2 cursor-pointer">
                                                            <img
                                                                className="max-w-[90px] w-full rounded-sm object-contain"
                                                                src={image.url}
                                                                alt=""
                                                            />
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            <div>
                                                {product_name}

                                                <div className="text-orange-600 font-bold text-lg">&#8369; {price}</div>
                                                <div className="my-5">
                                                    <span className="font-bold text-sm">Quantity</span>
                                                    <div className="flex border mt-2 w-fit">
                                                        <button
                                                            style={{opacity: quantity === 1 ? "0.3" : ""}}
                                                            disabled={quantity === 1}
                                                            className="border bg-slate-50"
                                                            onClick={e => {
                                                                e.preventDefault();
                                                                setQuantity(prev => prev - 1);
                                                            }}
                                                        >
                                                            <MinusSmallIcon className="h-6 w-6 text-gray-500" />
                                                        </button>
                                                        <input
                                                            readOnly
                                                            value={quantity || cart.quantity}
                                                            max={5}
                                                            className="w-[40px] text-center font-bold"
                                                            type="text"
                                                        />
                                                        <button
                                                            style={{opacity: quantity === 5 ? "0.3" : ""}}
                                                            disabled={quantity === 5}
                                                            className="border bg-slate-50"
                                                            onClick={e => {
                                                                e.preventDefault();
                                                                setQuantity(prev => prev + 1);
                                                            }}
                                                        >
                                                            <PlusSmallIcon className="h-6 w-6 text-gray-500" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <TrashIcon
                                                onClick={() => removeCart(_id)}
                                                className="h-5 w-5 text-gray-500 cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        <div className="sticky left-0 bottom-0 right-0 w-full px-3 py-5 bg-white border shadow-inner">
                            <div className="flex justify-between">
                                <div className="self-center">
                                    <div className="flex gap-2">
                                        <input
                                            checked={checkAll}
                                            onChange={toggleCheckAll}
                                            className="h-5 w-5 cursor-pointer"
                                            type="checkbox"
                                            name=""
                                            id="checkall"
                                        />
                                        <label htmlFor="checkall">All</label>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xl font-bold my-3">Order Summary</div>
                                    <div className="flex gap-4">
                                        <span>
                                            Total{" "}
                                            <span className="text-orange-500 text-2xl font-bold w-full">
                                                &#8369;{formattedNumber(totalSum)}
                                            </span>
                                        </span>
                                        <button
                                            onClick={() => CheckOutHandler(totalSum)}
                                            className="bg-black text-white py-3 px-6"
                                        >
                                            {checkOutLoader ? (<div className="flex gap-2 items-center"><TailSpin
                                                height="35"
                                                width="35"
                                                color="#c3d2c2"
                                                ariaLabel="tail-spin-loading"
                                                radius="1"
                                                wrapperStyle={{}}
                                                wrapperClass=""
                                                visible={true}
                                                /> processing</div>) : 'Checkout Now'} 
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
};

export default Cart;
