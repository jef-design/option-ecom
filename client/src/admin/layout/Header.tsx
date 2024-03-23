import useStore from "../../services/useStore";
import {Link} from "react-router-dom";
import {ShoppingBagIcon, UserCircleIcon} from "@heroicons/react/24/outline";
import {useQuery, QueryClient, useQueryClient} from "@tanstack/react-query";
import axiosInstance from "../../services/axiosInstance";
import {googleLogout} from "@react-oauth/google";
const Header = () => {
    const {admin, setLogOut, user, cart} = useStore();
    const queryCache = useQueryClient()
    const {data: cartsData} = useQuery({
        queryKey: ["getcart"],
        queryFn: () => axiosInstance.get("/api/products/cart").then((res) => res.data.products),
        enabled: user || admin ? true : false,
    });

    const logOutHandler = () => {
        axiosInstance.post(`/api/admin/logout`).then((res) => res.data);
        googleLogout();
        queryCache.removeQueries()
        setLogOut();
    };

    return (
        <div>
            <div className='flex items-center justify-between px-4 py-5 shadow-md'>
                <Link to={"/"}>
                    <h3 className='font-bold tracking-wider text-2xl'>OPTIONSHOP</h3>
                </Link>

                <div className='flex items-center gap-4'>
                    {user && <div className="flex items-center gap-2">
                        {!user?.picture ? <UserCircleIcon className='h-7 w-7 text-gray-500' /> : <img className='h-7 w-7 rounded-full' src={user?.picture} alt='picture' />}

                        <Link to='/orders'>
                            <span>{user?.email}</span>
                        </Link>
                    </div>}
                    <Link to={`/product/cart/${cartsData?._id}`} className='flex items-center gap-1'>
                        <ShoppingBagIcon className='h-7 w-7 text-gray-500' />
                        <span className='font-bold'>{user ? cartsData?.items?.length : cart.length}</span>
                    </Link>
                    {admin || user ? (
                        <span className='cursor-pointer' onClick={() => logOutHandler()}>
                            Sign Out
                        </span>
                    ) : (
                        <div className='flex gap-2'>
                            <Link to='/user/auth/signup'>Sign Up</Link>
                            <Link to='/user/auth/signin'>Sign In</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
