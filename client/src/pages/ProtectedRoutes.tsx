import { Outlet, Navigate } from 'react-router-dom'
import useStore from '../services/useStore'

const ProtectedRoutes = () => {
    const {user} = useStore()
  return (
    <div>
        {user ? <Outlet/> : <Navigate to={'/user/auth/signin'} />}
    </div>
  )
}

export default ProtectedRoutes