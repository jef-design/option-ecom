import { Link, Navigate, Outlet } from 'react-router-dom'
import useStore from '../../services/useStore'
import Header from '../layout/Header'


const Dashboard = () => {
    const {admin} = useStore()

  return (
    <div>
       <Header/>
        <div className='container bg-slate-50 flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10'>
            <aside className='fixed shadow-md bg-blue-600 text-white top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block'>
                <div className='px-4 py-2'>
                    <div className='mb-2 p-2 cursor-pointer hover:bg-blue-700'>
                        <Link className='block' to={'/'}>Dashboard</Link>
                    </div>
                    <div className='mb-2 p-2 cursor-pointer hover:bg-blue-700'>
                        <Link className='block' to={'/admin/products'}>Products</Link>
                    </div>
                    <div className='mb-2 p-2 cursor-pointer hover:bg-blue-700'>
                        <Link className='block' to={'/admin/orders'}>Orders</Link>
                    </div>
                    <div className='mb-2 p-2 cursor-pointer hover:bg-blue-700'>
                        <Link className='block' to={'/'}>Reports</Link>
                    </div>
                    <div className='mb-2 p-2 cursor-pointer hover:bg-blue-700'>
                        <Link className='block' to={'/'}>Users</Link>
                    </div>
                </div>
            </aside>
            {/* <main className='relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]'> */}
            <main className='relative py-6 lg:gap-10 lg:py-8 xl:grid'>
            {admin ? <Outlet/> : <Navigate to="/admin/signin" />}
            </main>
        </div>
       
    </div>
  )
}

export default Dashboard