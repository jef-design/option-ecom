import {Skeleton} from "@mui/material";

interface PropSkeleton {
    variant: any,
    width: string | number,
    height: string | number,
    animation: any,
}

const SkeletonPlaceholder = ({variant,width, height,animation}: PropSkeleton) => {
    return (
        <Skeleton
            // sx={{bgcolor: "#252833"}}
            variant={variant}
            width={width}
            height={height}
            animation={animation}
        />
    );
};

export default SkeletonPlaceholder;
