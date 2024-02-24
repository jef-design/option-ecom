
import { Link } from 'react-router-dom'
import Header from '../admin/layout/Header'
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import ConfettiExplosion from 'react-confetti-explosion';

const OrderSuccess = () => {

 
  return (
    
   <>
    <Header/>
    <main className='main-container flex justify-center mt-4 py-5'>
        <div className='text-center flex justify-center flex-col'>
        <CheckCircleIcon className="h-[120px] w-[120px] text-green-500 mx-auto" />
        <h3 className='text-2xl font-extrabold my-2'>Order Successful</h3>
        <div>
            <span className='text-yellow-400 font-bold text-2xl'>Thank you for your purchase!</span>
            <div className='text-gray-600'>Your transaction was completed successfully</div>
        </div>
        <Link to={'/orders'} className='bg-sky-500 text-white px-5 py-2 rounded-md inline-block mt-2'> View Order Status</Link>
        </div>
        <div className='absolute'>
        <ConfettiExplosion
            force={0.8}
            duration={5000}
            particleCount={180}
            width={1600}
          />
        </div>
    </main>
   </>
  )
}

export default OrderSuccess