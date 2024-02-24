import React from "react";
import SkeletonPlaceholder from "./SkeletonPlaceholder";
const ProductInfoLoader = () => {
    return (
        <div className="grid grid-cols-2 gap-8 bg-white px-4 py-2 rounded-md">
            <div className="flex gap-2">
                <SkeletonPlaceholder variant={"rectangular"} width={380} height={450} animation="pulse" />
                <div className="flex flex-col gap-2">
                    <SkeletonPlaceholder variant={"rectangular"} width={90} height={100} animation="pulse" />
                    <SkeletonPlaceholder variant={"rectangular"} width={90} height={100} animation="pulse" />
                    <SkeletonPlaceholder variant={"rectangular"} width={90} height={100} animation="pulse" />
                </div>
            </div>
            <div>
            <div className="flex flex-col gap-4">
            <SkeletonPlaceholder variant={"rectangular"} width={"55%"} height={30} animation="pulse" />
            <SkeletonPlaceholder variant={"rectangular"} width={55} height={30} animation="pulse" />
            <SkeletonPlaceholder variant={"rectangular"} width={55} height={30} animation="pulse" />
            <SkeletonPlaceholder variant={"rectangular"} width={55} height={30} animation="pulse" />
            <SkeletonPlaceholder variant={"rectangular"} width={"55%"} height={30} animation="pulse" />
            </div>
            <div className="flex gap-2 my-2">
            <SkeletonPlaceholder variant={"rectangular"} width={"100%"} height={50} animation="pulse" />
            <SkeletonPlaceholder variant={"rectangular"} width={"75%"} height={50} animation="pulse" />
            </div>
            </div>
        </div>
    );
};

export default ProductInfoLoader;
