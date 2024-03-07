import React, {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import axiosInstance from "../../services/axiosInstance";
import {TailSpin} from "react-loader-spinner";
import {PhotoIcon} from "@heroicons/react/24/outline";

const AdminAddProduct = () => {
    const [name, setName] = useState<string>("");
    const [detail, setDetail] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [stock, setStock] = useState<string>("");
    const [category, setCategory] = useState<string>("default");
    const [size, setSize] = useState<string>("default");
    const [images, setImage] = useState<any>(null);
    console.log(images)

    const [prevImage, setPrevImage] = useState<any>(null);
    console.log(prevImage);
    const queryClient = useQueryClient();

    const {mutateAsync, isLoading} = useMutation({
        mutationKey: ["addroducts"],
        mutationFn: (prodData: any) =>
            axiosInstance
                .post("/api/products/", prodData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then(res => res.data),
        onSuccess: prodData => {
            console.log(prodData);
            queryClient.invalidateQueries(["productslist"]);
        },
    });
    const submitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("detail", detail);
        formData.append("price", price);
        formData.append("stock", stock);
        formData.append("category", category);
        formData.append("size", size);
        for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
        }

        mutateAsync(formData);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files) {
            setImage(files);

            const imageUrls = Array.from(files).map(file => URL.createObjectURL(file));
            setPrevImage(imageUrls);
        }
    };

    return (
        <div className="px-5 bg-white py-4 rounded-md">
            <div className="border-b pb-3 mb-3">
                <h3 className="text-2xl font-bold">Create product</h3>
                <span className="text-sm text-gray-500">Add a new product</span>
            </div>
            <form onSubmit={submitHandler}>
                <div className="mb-5">
                    <div className="bg-slate-100 py-2 w-fit">
                        <label htmlFor="fileInput" id="customFileLabel">
                            <div className="flex items-center cursor-pointer border-r px-5">
                                <PhotoIcon className="h-4 w-4 text-sky-500 cursor-pointer mr-2" />
                                <span className="text-base">Upload Images</span>
                            </div>
                        </label>
                        <input
                            accept="image/*,video/*"
                            multiple
                            type="file"
                            id="fileInput"
                            onChange={handleImageChange}
                            className=" hidden"
                        />
                    </div>
                    <div className="flex gap-2 my-3 h-[150px] w-[150px] rounded-md border border-dashed">
                    {prevImage?.map((url: string, index: number) => (
                    <img key={index} src={url} alt={`Image ${index}`} className="h-[150px] w-[150px] rounded-md" />
                    ))}
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="mb-2">
                        <label htmlFor="" className="font-[500]">
                            Product Name
                        </label>
                        <input
                            onChange={e => {
                                setName(e.target.value);
                            }}
                            className="block border p-1 w-full"
                            type="text"
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="tete" className="font-[500]">
                            Description
                        </label>
                        {/* <input
                            onChange={e => {
                                setDetail(e.target.value);
                            }}
                            className="block border p-1 w-full"
                            type="text"
                        /> */}
                        <textarea  onChange={e => {
                                setDetail(e.target.value);
                            }} name="product_desc" id="tete" cols={30} rows={1}placeholder="Enter Product Description"></textarea>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="" className="font-[500]">
                            Stock
                        </label>
                        <input
                            onChange={e => {
                                setStock(e.target.value);
                            }}
                            className="block border p-1 w-full"
                            type="text"
                        />
                    </div>
                    <div>
                        <label htmlFor="categorySelect" className="font-[500]">
                            Category
                        </label>
                        <select
                            id="categorySelect"
                            value={category}
                            className="mb-2 w-full border py-2"
                            onChange={e => setCategory(e.target.value)}
                        >
                            <option value="default" disabled>
                                Select Category
                            </option>
                            <option value="tshirt">T-Shirt</option>
                            <option value="shoes">Shoes</option>
                            <option value="pants">Pants</option>
                            <option value="shorts">Shorts</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="categorySelect" className="font-[500]">
                            Size
                        </label>
                        <select
                            className="mb-2 w-full border py-2"
                            value={size}
                            onChange={e => setSize(e.target.value)}
                        >
                            <option value="default" disabled>
                                Select Size
                            </option>
                            <option value="Small">Small</option>
                            <option value="Medium">Medium</option>
                            <option value="Large">Large</option>
                            <option value="XL">XL</option>
                        </select>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="" className="font-[500]">
                            Price
                        </label>
                        <input
                            onChange={e => {
                                setPrice(e.target.value);
                            }}
                            className="block border p-1 w-full"
                            type="text"
                        />
                    </div>
                </div>
                <button
                    style={isLoading ? {opacity: "0.5"} : {}}
                    className="flex w-fit gap-2 items-center justify-center px-4 py-2 bg-gray-900 text-white text-center mt-2 rounded-sm"
                >
                    {isLoading ? "Creating" : "Create "}
                    {isLoading && (
                        <TailSpin
                            height={25}
                            width={25}
                            color="#0b536d"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            ariaLabel="oval-loading"
                            // secondaryColor="#0b536d"
                            strokeWidth={4}
                            // strokeWidthSecondary={4}
                        />
                    )}
                </button>
            </form>
        </div>
    );
};

export default AdminAddProduct;
