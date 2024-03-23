import SkeletonPlaceholder from "./SkeletonPlaceholder";
const ProductCardPlaceHolder = () => {
    return (
           <div className="grid grid-cols-4 gap-4 max-:">
            <SkeletonPlaceholder variant={"rectangular"} width={'250px'} height={'340px'} animation="pulse" />
            <SkeletonPlaceholder variant={"rectangular"} width={''} height={'340px'} animation="pulse" />
            <SkeletonPlaceholder variant={"rectangular"} width={''} height={'340px'} animation="pulse" />
            <SkeletonPlaceholder variant={"rectangular"} width={''} height={'340px'} animation="pulse" />
            </div>
        
    );
};

export default ProductCardPlaceHolder;
