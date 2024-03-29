import {useId} from "react";

interface Props {
    filterHandler: any;
}

const Filter = ({filterHandler}: Props) => {

    const id0 = useId();
    const id1 = useId();
    const id2 = useId();
    const id3 = useId();
    const id4 = useId();

    return (
        <div className="mr-5">
            <div>
                <div className="font-bold py-2">Filter</div>
            </div>
            <div className="border-t pt-2 px-5">
                <h3>Category</h3>
                <div className="flex flex-col gap-4 mt-3">
                    <div className="flex gap-3">
                        <input
                            className="cursor-pointer"
                            onClick={() => filterHandler("all")}
                            type="radio"
                            id={id0}
                            name="fav_language"
                            value="All"
                            defaultChecked
                          
                        />
                        <label className="cursor-pointer" htmlFor={id0}>
                            All
                        </label>
                    </div>
                    <div className="flex gap-3">
                        <input
                            className="cursor-pointer"
                            onClick={() => filterHandler("tshirt")}
                            type="radio"
                            id={id1}
                            name="fav_language"
                            value="Tshirt"
                        />
                        <label className="cursor-pointer" htmlFor={id1}>
                            Tshirt
                        </label>
                    </div>
                    <div className="flex gap-3">
                        <input
                            className="cursor-pointer"
                            onClick={() => filterHandler("pants")}
                            type="radio"
                            id={id2}
                            name="fav_language"
                            value="Pants"
                        />
                        <label className="cursor-pointer" htmlFor={id2}>
                            Pants
                        </label>
                    </div>
                    <div className="flex gap-3">
                        <input
                            className="cursor-pointer"
                            onClick={() => filterHandler("shoes")}
                            type="radio"
                            id={id3}
                            name="fav_language"
                            value="Shoes"
                        />
                        <label className="cursor-pointer" htmlFor={id3}>
                            Shoes
                        </label>
                    </div>
                    <div className="flex gap-3">
                        <input
                            className="cursor-pointer"
                            onClick={() => filterHandler("shorts")}
                            type="radio"
                            id={id4}
                            name="fav_language"
                            value="Shorts"
                        />
                        <label className="cursor-pointer" htmlFor={id4}>
                            Shorts
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filter;
