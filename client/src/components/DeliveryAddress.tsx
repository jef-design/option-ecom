import React from "react";
import { MapPinIcon } from "@heroicons/react/24/outline";



const DeliveryAddress = () => {
    return (
        <div>
            <div>
            <div className="flex items-center gap-2 mb-3">
            <MapPinIcon className="h-6 w-6 text-black" /> <div>Delivery Address</div>
            </div>
                <div>
                    <form action="">
                    <div className="mb-2">
                        <label htmlFor="" className="font-[500]">
                            Full Name
                        </label>
                        <input
                            onChange={e => {
                                // setName(e.target.value);
                            }}
                            className="block border p-1 w-full"
                            type="text"
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="" className="font-[500]">
                            Phone Number
                        </label>
                        <input
                            onChange={e => {
                                // setName(e.target.value);
                            }}
                            className="block border p-1 w-full"
                            type="text"
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="" className="font-[500]">
                            Address
                        </label>
                        <input
                            onChange={e => {
                                // setName(e.target.value);
                            }}
                            className="block border p-1 w-full"
                            type="text"
                        />
                    </div>
                    </form>
                </div>
                <div className="custom-border-top-style"></div>
            </div>
        </div>
    );
};

export default DeliveryAddress;
