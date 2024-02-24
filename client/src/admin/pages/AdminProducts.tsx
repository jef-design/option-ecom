import {useQuery} from "@tanstack/react-query";
import {Link} from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";
import { PlusSmallIcon } from "@heroicons/react/24/outline";




const AdminProducts = () => {
    const {data: productsData} = useQuery({
        queryKey: ["productslist"],
        queryFn: () => axiosInstance.get("/api/products/search").then(res => res.data),
    });
    console.log(productsData);
    return (
        <div className="bg-white p-4 rounded-md">
            <div className="flex justify-between">
                <div>
                    <h3 className="font-bold text-lg mb-2">Products ({productsData?.products.length})</h3>
                    <span className="text-sm text-slate-700"> Manage products for your store</span>
                </div>

                <div>
                <Link to={"/admin/addproduct"} className="border bg-black rounded-md text-white p-2 w-fit text-sm flex gap-1 items-center">
                <PlusSmallIcon className="h-6 w-6 text-white" /> Add New
                </Link>
                </div>
            </div>
            <div>
                <table className="w-full my-3">
                    <thead className="font-bold">
                        <tr>
                            <td className="py-2">Product name</td>
                            <td className="py-2">Image</td>
                            <td>Product description</td>
                            <td>Price</td>
                            <td>Stock</td>
                            <td>Category</td>
                            <td>Size</td>
                        </tr>
                    </thead>
                    <tbody>
                        {productsData?.products?.map((prod: any, i: any) => {

                            return (
                                <tr key={i} className="border text-slate-600 text-sm hover:bg-slate-50">
                                    <td className="p-2 max-w-[230px]">{prod.product_name}</td>
                                    {prod.images.slice(0,1).map((im:any, i:number)=> {
                                        return <td className="p-2" key={i}>
                                            <img className="h-[40px] w-[40px]" src={im.url} alt="" />
                                        </td>
                                    })}
                                    <td className="line-clamp-1 max-w-[230px]">{prod.description}</td>
                                    <td>{prod.price}</td>
                                    <td>{prod.stock}</td>
                                    <td>{prod.category}</td>
                                    <td>{prod.size}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminProducts;
