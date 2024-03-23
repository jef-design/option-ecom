import {useEffect, useState} from "react";
import Header from "../admin/layout/Header";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import {useMutation} from "@tanstack/react-query";
import axiosInstance from "../services/axiosInstance";
import {useQuery} from "@tanstack/react-query";
import {BanknotesIcon, CreditCardIcon} from "@heroicons/react/20/solid";
import {useNavigate} from "react-router-dom";
import {MapPinIcon} from "@heroicons/react/24/outline";

const stripePromise = loadStripe(
    "pk_test_51O3u8pKcM8Y1wyvPHhfJlFQvyce20M0JtcJGVA6zTcDvM4X85q8d4iSlsHZ9PU56cdYayc29IXhcV9bbXRNZUHYH00tffRTpun"
);

const PlaceOrder = () => {
    const [clientSecret, setClientSecret] = useState<any>("");
    const [payMethod, setPayMethod] = useState<any>("");
    const [fullName, setFullName] = useState<any>("");
    const [phoneNumber, setPhoneNumber] = useState<any>("");
    const [address, setAddress] = useState<any>("");
    const [errorStatus, setErrorStatus] = useState<boolean>(false);

    const [paymentIntentId, setPaymentIntentId] = useState<any>("");
    const navigate = useNavigate();

    const paymentHandler = async (paymentInfo: any) => {
        const response = await axiosInstance.post("/api/order/create-payment-intent", paymentInfo);
        console.log(response);
        return response.data;
    };

    const {mutate} = useMutation({
        mutationFn: paymentHandler,
        mutationKey: ["payment"],
        onSuccess: paymentInfo => {
            setClientSecret(paymentInfo?.clientSecret);
            setPaymentIntentId(paymentInfo?.paymentIntent.id);
        },
    });
    //cancel payment intent

    const {mutate: cancelPayment} = useMutation({
        mutationFn: (cancelPaymentId: any) =>
            axiosInstance.post("/api/order/cancel-payment-intent", cancelPaymentId).then(res => res.data),
        mutationKey: ["cancel-payment"],
        onSuccess: cancelPaymentId => {
            console.log(cancelPaymentId);
        },
    });

    /// cancel order
    // const {mutate: mutateCancelOrder} = useMutation({
    //     mutationFn: (cancelOrder: any) =>
    //         axiosInstance.post("/api/order/cancel-order", cancelOrder).then(res => res.data),
    //     mutationKey: ["cancel-order"],
    //     onSuccess: cancelOrder => {
    //         console.log(cancelOrder);
    //     },
    // });

    const options: any = {
        clientSecret: clientSecret,
        appearance: {
            theme: "flat",
        },
    };

    const {data: orderData} = useQuery({
        queryKey: ["getorder"],
        queryFn: () => axiosInstance.get("/api/order/check-out").then(res => res.data.order),
    });

    const paymentMethodHandler = (payment: any) => {
        setPayMethod(payment);
    };

    const {mutate: mutateplaceOrder, isLoading: loadingPlaceOrder} = useMutation({
        mutationFn: (placeOrder: any) => axiosInstance.post("/api/order/place-order", placeOrder).then(res => res.data),
        mutationKey: ["place-order"],
        onSuccess: placeOrder => {
            console.log(placeOrder);
            navigate("/order-success");
        },
    });

    const placeOrderHandler = () => {
        const placeOrderData = {
            full_Name: fullName,
            Phone_number: phoneNumber,
            Address: address,
            order_id: orderData?.order_id,
            items: orderData?.items,
            payment_method: payMethod,
            status: "processing",
        };
        if(!fullName || !phoneNumber || !address){
            setErrorStatus(true)
        }
        else{
            mutateplaceOrder(placeOrderData);
        }
    };
    useEffect(() => {
        const paymentInfo = {amount: orderData?.total_amount};
        if (payMethod === "Stripe") {
            mutate(paymentInfo);
        }

        const cancelPaymentId = {paymentIntentId: paymentIntentId};
        if (payMethod === "Cash On Delivery" && paymentIntentId) {
            cancelPayment(cancelPaymentId);
        }

        return () => {
            console.log("render return");
        };
        // return () => {
        //     const cancelOrder = {order_id: orderData?.order_id, status: 'pending'}
        //     mutateCancelOrder(cancelOrder)
        // }
    }, [payMethod]);

    //formatter amount
    const option = {maximumFractionDigits: 2};
    const formattedNumber = (num: any) => {
        return Intl.NumberFormat("en-US", option).format(num);
    };
    return (
        <div>
            <Header />
            <div className="mt-2 grid grid-cols-2 gap-8 px-5 main-container">
                <div>
                    <div>
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <MapPinIcon className="h-6 w-6 text-black" /> <div>Delivery Address</div>
                            </div>
                            <div>
                                <form action="">
                                    <div className="mb-2">
                                        <label htmlFor="" className="font-[500]">
                                            Full Name
                                        </label>
                                        <input
                                        style={errorStatus ? { border: '1px solid red' } : {}}
                                            onChange={e => {
                                                setFullName(e.target.value);
                                            }}
                                            className="block border p-1 w-full"
                                            type="text"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="" className="font-[500]">
                                            Phone Number
                                        </label>
                                        <input
                                        style={errorStatus ? { border: '1px solid red' } : {}}
                                            onChange={e => {
                                                setPhoneNumber(e.target.value);
                                            }}
                                            className="block border p-1 w-full"
                                            type="text"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="" className="font-[500]">
                                            Address
                                        </label>
                                        <input
                                        style={errorStatus ? { border: '1px solid red' } : {}}
                                            onChange={e => {
                                                setAddress(e.target.value);
                                            }}
                                            className="block border p-1 w-full"
                                            type="text"
                                        />
                                    </div>
                                </form>
                            </div>
                            {errorStatus && (<div className="text-red-500 my-4">All fields must be filled</div>)}
                            <div className="custom-border-top-style"></div>
                        </div>
                    </div>
                    <div className="max-h-[350px] h-full overflow-x-auto">
                        {orderData?.items?.map((cart: any) => {
                            const {product_name, images, price} = cart.product_id;
                            return (
                                <div className="border px-3 py-2 shadow-sm mt-2 bg-slate-50" key={cart._id}>
                                    <div className="flex gap-4 justify-between">
                                        <div className="flex gap-4 items-center">
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
                                                <div>x{cart.quantity}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="h-[450px] relative">
                    <div>
                        Select Payment Method
                        <div>
                            {!payMethod && (<div className="text-red-500 p-2 border w-fit border-red-500">Please select payment method</div>)}
                        </div>
                        <div className="flex items-center gap-3 my-3">
                            <input
                                className="cursor-pointer w-5 h-5"
                                onClick={() => paymentMethodHandler("Cash On Delivery")}
                                type="radio"
                                id="cod"
                                name="fav_language"
                                value="Cash-on-delivery"
                            />

                            <BanknotesIcon className="h-7 w-7 text-green-500" />

                            <label className="cursor-pointer text-sm" htmlFor="cod">
                                Cash on Delivery
                            </label>
                        </div>
                        <div className="flex items-center gap-3">
                            <input
                                className="cursor-pointer w-5 h-5"
                                onClick={() => paymentMethodHandler("Stripe")}
                                type="radio"
                                id="stripe"
                                name="fav_language"
                                value="Stripe"
                            />
                            <CreditCardIcon className="h-7 w-7 text-blue-500" />
                            <label className="cursor-pointer text-sm" htmlFor="stripe">
                                Stripe
                            </label>
                        </div>
                    </div>
                    {payMethod === "Stripe" && (
                        <div className="max-w-[560px] w-full mt-3 border p-4 rounded-md">
                            {stripePromise && clientSecret && (
                                <Elements stripe={stripePromise} options={options}>
                                    <CheckoutForm orderData={orderData} placeOrderHandler={placeOrderHandler} />
                                </Elements>
                            )}
                        </div>
                    )}
                    {payMethod === "Cash On Delivery" || payMethod === "" ? (
                        <div className="mt-5 sticky bottom-0 right-0">
                            <span>
                                Total Payment{" "}
                                <span className="text-3xl font-bold ml-3">
                                    {" "}
                                    &#8369; {formattedNumber(orderData?.total_amount)}
                                </span>
                            </span>
                            <button
                                className="px-4 py-2 rounded-md text-white bg-black w-full my-3"
                                onClick={() => placeOrderHandler()}
                            >
                                {loadingPlaceOrder ? "Processing..." : "Place Order"}
                            </button>
                        </div>
                    ) : null}
                </div>
            </div>
            {/* <button onClick={submitHandler}>pay</button> */}
        </div>
    );
};

export default PlaceOrder;
