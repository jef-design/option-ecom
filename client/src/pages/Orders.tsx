import React, {useEffect} from "react";
import Header from "../admin/layout/Header";
import {useQuery} from "@tanstack/react-query";
import axiosInstance from "../services/axiosInstance";
import {Link} from "react-router-dom";

const Orders = () => {
    const {data: orderData} = useQuery({
        queryKey: ["getorderpocess"],
        queryFn: () => axiosInstance.get("/api/order/orders").then(res => res.data.order),
    });

    const options = {maximumFractionDigits: 2};
    const formattedNumber = (num: any) => {
        return Intl.NumberFormat("en-US", options).format(num);
    };

    const getStatusColor = (status: string): string => {
        switch (status.toLowerCase()) {
          case 'processing':
            return 'blue';
          case 'shipped':
            return 'yellow';
          case 'delivered': // Adjust this based on your actual status values
            return 'green';
          default:
            return 'gray';
        }
      };
    
    return (
        <div>
            <Header />
            <main className="main-container">
                <h3>All Orders</h3>
                {orderData?.map((order: any) => {
                    const {order_id, status, total_amount} = order;
                    return (
                        <div key={order_id}>
                            <div>
                                <div>
                                    {order?.items?.map((item: any, i: any) => {
                                        const {images} = item.product_id;

                                        return (
                                            <div className="grid grid-cols-2  mb-2 shadow-md border p-4" key={i}>
                                                <div>
                                                    <div className=" uppercase font-bold flex items-center gap-2">
                                                        <span style={{ backgroundColor: getStatusColor(order.status) }} className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>{" "}
                                                        {status}
                                                    </div>
                                                    <span>Order ID #{order_id}</span>x{item.quantity}
                                                    <img className="max-w-[140px]" src={images[0].url} alt="" />
                                                </div>
                                                <div>
                                                    <span>Total Price: </span>{" "}
                                                    <span className="font-bold">
                                                        &#8369;{formattedNumber(total_amount)}
                                                    </span>
                                                    <div>
                                                        <span>
                                                            {order?.items?.length}{" "}
                                                            {order?.items?.length <= 1 ? "item" : "items"}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <Link
                                                            className="p-2 bg-black text-white rounded-md inline-block mt-2"
                                                            to={`/review/${item._id}`}
                                                        >
                                                            Add Review
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </main>
        </div>
    );
};

export default Orders;
