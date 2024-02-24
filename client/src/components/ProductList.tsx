import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import axiosInstance from "../services/axiosInstance";
import ProductCard from "./ProductCard";
import React from "react";
import Filter from "./Filter";
import {useSearchParams, useLocation} from "react-router-dom";
import Sort from "./Sort";
import ProductCardPlaceHolder from "./ProductCardPlaceHolder";

const ProductList = () => {
   
    const [searchParams, setSearchParams] = useSearchParams();
    const activeFilter = searchParams.get("category");
    const [selectedOption, setSelectedOption] = useState("");
    const [productData, setProductData] = useState([]);

    const filterHandler = (categ: string) => {
        setSearchParams({category: categ});
    };

    const {data: ProductsData, isLoading} = useQuery({
        queryKey: ["products", activeFilter],
        queryFn: () =>
            axiosInstance
                .get(`/api/products/search?category=${activeFilter ? activeFilter : "All"}`)
                .then(res => res.data),
    });

    const options = ["Featured", "New Release", "Price lowest to highest", "Price highest to lowest"];
    

    const handleSelect = (option: any) => {
        setSelectedOption(option);
    };

    return (
        <div className="flex gap-6">
            <Filter filterHandler={filterHandler} />
            <div>
                <div className="flex items-center justify-between mb-2">
                    <h2 className="font-bold text-lg mb-2">Featured Products</h2>
                    <Sort options={options} onSelect={handleSelect} />
                </div>

                {isLoading && (<ProductCardPlaceHolder/>)}
                <div className="grid grid-cols-4 gap-4">
                   
                    {ProductsData?.products?.map((product: any) => {
                        const {_id, images, product_name, price} = product;
                        return (
                            <React.Fragment key={_id}>
                                <ProductCard
                                    productId={_id}
                                    images={images}
                                    product_name={product_name}
                                    price={price}
                                />
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProductList;
