import {useState, useEffect} from 'react'

interface Props {
    num: string,
   
}

const usePriceFormat = ({num}: Props) => {
    const [value, setValue] = useState(num)

        const options = {  maximumFractionDigits: 2   }  
        const formattedNumber = (num: any) => {
            const formatted = Intl.NumberFormat("en-US",options).format(num); 
            setValue(formatted)
            return formatted
        }
    
    return {
        value, // You can return the value if needed
        formattedNumber, // You can return the setValue function if needed
      };
}

export default usePriceFormat