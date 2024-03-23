import React, {useState} from "react";
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import axiosInstance from "../../services/axiosInstance";

const AdminOrders = () => {
    const [deliveryStatus] = useState<string>("");
    const queryClient = useQueryClient();
    console.log(deliveryStatus);

    const {data: getOrders} = useQuery({
        queryKey: ["getorders"],
        queryFn: () => axiosInstance.get("/api/order/orders").then(res => res.data.order),
    });

    const {mutate, isLoading} = useMutation({
        mutationKey: ["delivery-status"],
        mutationFn: (delStatus: any) =>
            axiosInstance.post("/api/order/delivery-status", delStatus).then(res => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries(["getorders"]);
        },
    });

    const changeStatusHandler = (e: React.ChangeEvent<HTMLSelectElement>, orderId: number) => {
        // setDeliveryStatus()
        const deliveryS = e.target.value;
        const delStatus = {order_id: orderId, status: deliveryS};
        console.log(delStatus);
        mutate(delStatus);
    };

    return (
        <div className="bg-white p-4 rounded-md overflow-x-auto">
            <div className="flex justify-between">
                <div>
                    <h3 className="font-bold text-lg mb-2">Orders ({getOrders?.length})</h3>
                    <span className="text-sm text-slate-700"> List of all orders</span>
                </div>
            </div>
            <div>
                <table className="w-full my-3">
                    <thead className="font-bold">
                        <tr>
                            <td className="py-2">Order ID</td>
                            <td className="py-2">Customer Name</td>
                            <td className="py-2">Address</td>
                            <td className="py-2">Phone Number</td>
                            <td>Payment Method</td>
                            <td>Total Amount</td>
                            <td>Status</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {getOrders?.map((order: any, i: any) => {
                            return (
                                <tr key={i} className="border text-slate-600 text-sm hover:bg-slate-50">
                                    <td className="p-2 max-w-[230px]">{order.order_id}</td>
                                    {/* {prod.images.slice(0,1).map((im:any, i:number)=> {
                                        return <td className="p-2" key={i}>
                                            <img className="h-[40px] w-[40px]" src={im.url} alt="" />
                                        </td>
                                    })} */}
                                    {/* <td className="line-clamp-1 max-w-[230px]">{order.description}</td> */}
                                    <td>{order.full_Name}</td>
                                    <td>{order.Address}</td>
                                    <td>{order.Phone_number}</td>
                                    <td>{order.payment_method}</td>
                                    <td>{order.total_amount}</td>
                                    <td>{isLoading ? "Please wait..." : order.status}</td>
                                    <td className="flex items-center relative">
                                        <select
                                            value={deliveryStatus}
                                            onChange={e => changeStatusHandler(e, order.order_id)}
                                            className="absolute top-2 border bg-white"
                                        >
                                             <option disabled value="">Action</option>
                                            <option value="processing">Processing</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="delivered">Delivered</option>
                                        </select>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminOrders;
