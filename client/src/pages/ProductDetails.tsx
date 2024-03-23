import React, {useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import axiosInstance from "../services/axiosInstance";
import {PlusSmallIcon, MinusSmallIcon} from "@heroicons/react/24/outline";
import useStore from "../services/useStore";
import { TailSpin } from "react-loader-spinner";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import ProductInfoLoader from "../components/ProductInfoLoader";
import Reviews from "../components/Reviews";

const ProductDetails = () => {
    const params = useParams();
    const [imageSelected, setImageSelected] = useState("");
    const [quantity, setQuantity] = useState(1)
    const queryClient = useQueryClient()
    const {user} = useStore()
    const navigate = useNavigate()
    

    const {data: ProductsData, isLoading} = useQuery({
        queryKey: ["getproduct", params.id],
        queryFn: () => axiosInstance.get(`/api/products/${params.id}`).then(res => res.data),
    });

    const {product_name,review, images, description, price, size} = ProductsData?.product || {};
    

    //cart

    const {mutate, isLoading: cartLoader} = useMutation({
        mutationKey: ["addcart"],
        mutationFn: (cartData: any) =>
            axiosInstance
                .post("/api/products/cart", cartData)
                .then(res => res.data),
        onSuccess: prodData => {
            console.log(prodData);
            queryClient.invalidateQueries(["getcart"]);
        },
    });

    const addCartHandler = async(e: React.SyntheticEvent)=> {
        e.preventDefault()
        const cartData = {product_id: params.id,customer_id: user?._id, quantity: quantity}

        if(!user){
            navigate('/user/auth/signin')
        }else{
            mutate(cartData)
            toast("Added to Bag !");
        }

        // if(user){
        //     setCart(cartData);
        // }else{
        //     mutate(cartData)
        // }
       
    }
    
    if (isLoading) {
        return <ProductInfoLoader/>;
    }
    return (
        <div>
            <main className="main-container">
                {/* {isLoading && (<ProductInfoLoader/>)} */}
                <form onSubmit={addCartHandler}>
                <div className="grid grid-cols-2 gap-8">
                    <div className="grid grid-cols-5 gap-2">
                        <div className="col-span-4">
                            {images && images[0] && (
                                <img
                                    className="object-cover w-full"
                                    src={imageSelected ? imageSelected : images[0]?.url}
                                    alt="sd"
                                />
                            )}
                        </div>
                        <div className="col-span-1">
                            {images?.map((image: any) => {
                                return (
                                    <div
                                    style={imageSelected === image.url ? { border: '1px solid black' } : {}}
                                     key={image.public_id} className="mb-2 cursor-pointer border w-fit">
                                        <img
                                            onMouseEnter={() => setImageSelected(image.url)}
                                            className="max-w-[90px] w-full rounded-sm object-contain"
                                            src={image.url}
                                            alt=""
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div>
                        <span>{product_name}</span>
                        <div>
                            <span className="text-orange-500 text-2xl font-bold"> &#8369; {price}</span>
                        </div>
                        <div className="my-5">
                            <span className="font-bold">Size</span>
                            <div className="bg-gray-100 w-fit px-2 py-1 mt-2 rounded-sm">{size}</div>
                        </div>
                       

                        <div className="my-5">
                            <span className="font-bold">Quantity</span>
                            <div className="flex border mt-2 w-fit">
                                <button
                                    style={{opacity: quantity === 1 ? '0.3' : ''}}
                                    disabled={quantity === 1}
                                    className="border "
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setQuantity(prev => prev - 1)
                                    }}
                                >
                                    <MinusSmallIcon className="h-6 w-6 text-gray-500" />
                                </button>
                                <input
                                readOnly
                                    value={quantity}
                                    max={5}
                                    className="w-[40px] text-center font-bold"
                                    type="text"
                                />
                                <button 
                                style={{opacity: quantity === 5 ? '0.3' : ''}}
                                disabled={quantity === 5}
                                className="border " onClick={(e) => {
                                    e.preventDefault()
                                    setQuantity(prev => prev + 1)
                                }}>
                                    <PlusSmallIcon className="h-6 w-6 text-gray-500" />
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 my-5 ">
                            <button onClick={()=> addCartHandler} className=" bg-black flex justify-center text-white rounded-sm w-full text-2xl font-bold p-2 col-span-2 uppercase">
                               {cartLoader ? (<TailSpin
                                                height="35"
                                                width="35"
                                                color="#c3d2c2"
                                                ariaLabel="tail-spin-loading"
                                                radius="1"
                                                wrapperStyle={{}}
                                                wrapperClass=""
                                                visible={true}
                                                />) : 'Add to Bag'} 
                            </button>
                            <button className="border-2 border-black text-black font-bold rounded-sm w-full text-2xl p-2">Buy Now</button>
                        </div>
                        <div className="my-5">
                            <span className="font-bold">Description</span>
                            <pre className="font-sans mt-2 text-sm leading-7 font-[500] text-slate-800">{description}</pre>
                        </div>
                    </div>
                </div>
                </form>
                <Reviews reviews={review} />
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

export default ProductDetails;
