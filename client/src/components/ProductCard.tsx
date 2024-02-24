import { Link } from "react-router-dom"
import { HeartIcon } from "@heroicons/react/24/outline";
import React from "react";


interface ProductProps {
    productId: string | number,
    images: [],
    product_name: string,
    price: number
}

const ProductCard = ({productId, images, product_name, price}: ProductProps) => {
  return (
    <React.Fragment key={productId}>
        <Link to={`/product/${productId}/${product_name.replace(/ /g, "-").toLowerCase()}`} >
        <div>
           <div className="relative">
           {images.slice(0,1).map((image: any) => {
                return(
                    <React.Fragment key={image.public_id}>
                        <img  className='max-w-[350px] w-full rounded-sm object-contain' src={image.url} alt="" />
                        <HeartIcon className="h-6 w-6 text-slate-200 absolute right-3 top-3 z-10" />

                    </React.Fragment>
                )
            })}
           </div>
            <div className='text-xs overflow-hidden mt-3 line-clamp-1'>
                {product_name}
            </div>
            <span className="font-bold text-orange-500">
                &#8369; {price}
            </span>
        </div>
    </Link>
    </React.Fragment>
  )
}

export default ProductCard