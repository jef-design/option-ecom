import React, {useState} from "react";
import Header from "../admin/layout/Header";
import Rating from "@mui/material/Rating";
import {useMutation, useQuery} from "@tanstack/react-query";
import axiosInstance from "../services/axiosInstance";
import {useParams, useNavigate} from "react-router-dom";
import useStore from "../services/useStore";

const ReviewStar = () => {
    const params = useParams();
    console.log(params)
    // const [starRating, setStarRating] = useState<number | null>(1);
    // const [starRating, setStarRating] = useState<{ [key: string]: number | null }>({});
    const [starRating, setStarRating] = useState< number | null >(1);
    console.log(starRating)
    const [comment, setComment] = useState<string | null>("");
    const {user} = useStore();
    const navigate = useNavigate()

    const reviewHandler = async (reviewData: any) => {
        const response = await axiosInstance.post(`/api/products/review/${params.orderId}`, reviewData);
        console.log(response);
        return response.data;
    };

    const {mutate, isLoading} = useMutation({
        mutationKey: ["addreview"],
        mutationFn: reviewHandler,
        onSuccess: () => {
            navigate('/orders')
        }
    });

    const reviewSubmit = (e: React.SyntheticEvent, product_id: any): void => {
        e.preventDefault();
        const reviewData = {userId: user._id, star: starRating, comment: comment, product_id: product_id};
        mutate(reviewData);
    };

    const {data: getOrder} = useQuery({
        queryKey: ["getorders"],
        queryFn: () => axiosInstance.get(`api/order/${params.orderId}`).then(res => res.data.order),
    });
    console.log(getOrder);
    return (
        <div>
            <Header />
            <main className="main-container">
                {getOrder &&
                    getOrder.items?.map((item: any, index: any) => {
                        const {images} = item.product_id;
                        return (
                            <div className="flex flex-col gap-4 border p-3 mb-4" key={index}>
                                <form>
                                    <div className="flex gap-4 my-2">
                                        <img className="max-w-[90px]" src={images[0].url} alt="" />
                                        <div>{item.product_id.product_name}</div>
                                    </div>
                                    <h2>Your Rating</h2>
                                    <Rating
                                        name="simple-controlled"
                                        value={starRating}
                                        onChange={(event, newValue) => {
                                            setStarRating(newValue);
                                        }}
                                    />
                                    <input
                                        type="text"
                                        className="outline-none border rounded-md p-4 w-full my-3"
                                        placeholder="Add your comment"
                                        onChange={e => setComment(e.target.value)}
                                    />
                                    <div>
                                        <button
                                            onClick={(e: React.SyntheticEvent) => reviewSubmit(e, item.product_id._id)}
                                            className="outline-none bg-black text-white rounded-md px-3 py-1"
                                        >
                                            {isLoading ? 'Processing' : 'Submit review'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        );
                    })}
            </main>
        </div>
    );
};

export default ReviewStar;
