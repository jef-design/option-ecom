import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import useStore from "../services/useStore";
const EmptyCart = () => {
  const {user} = useStore()
  return (
    <div className="flex items-center justify-center border shadow-md px-5 py-7 h-full">
       <div className="flex flex-col text-center">
       <ShoppingBagIcon className="h-[140px] w-6[140px] text-gray-500" />
        <div>
            <span className="text-lg uppercase font-bold">your bag is empty</span>
            <div>
                <span className="text-sm text-slate-500">sign in to view your cart and start shopping</span>
            </div>
            <div>
            {user ? <Link className="bg-black text-white rounded-sm px-4 py-2 inline-block my-4 uppercase" to={'/'}>SHOP NOW</Link> :
             <Link className="bg-black text-white rounded-sm px-4 py-2 inline-block my-4 uppercase" to={'/user/auth/signin'}>Sign in to shopping</Link>}
               
            </div>
        </div>
       </div>
    </div>
  )
}

export default EmptyCart