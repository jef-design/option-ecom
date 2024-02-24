import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import axiosInstance from '../../services/axiosInstance'
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";
import {TailSpin} from 'react-loader-spinner'
import { AxiosError } from 'axios';
import useStore from '../../services/useStore';
import Header from '../layout/Header';

// Define a type for the error response
type ErrorResponse = AxiosError<any>;

type ErrorMessage = {
    message: string
}
const SignIn = () => {

    // const [username, setUsername] = useState('')
    // const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [visible, setVisible] = useState('password')
    const [error, setError] = useState<ErrorMessage | null>(null);

    const navigate = useNavigate()
    const {setAdminCredentials} = useStore()

    const signUpHandler = async (User: any) => {
        const response = await axiosInstance.post('/api/admin/signin', User);
        console.log(response)
        return response.data;
      };
      
    const {mutate, isError, isLoading} = useMutation({
        mutationFn: signUpHandler,
        mutationKey: ['signup'],
        onSuccess: (User) => {
            console.log(User)
            setAdminCredentials(User.admin)
            navigate('/')
        },
        onError: (errorResponse: ErrorResponse)=> {
            setError(errorResponse?.response?.data)
        }
    })
    const submitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault()
        const User = {email,password}
        mutate(User)
    }
  return (
   <>
     <Header/>
    <div className=' max-w-[458px] w-full mt-9 mx-auto border rounded-md p-5 bg-white'>
        <div>
            <h3 className=' text-center font-bold text-lg'>Sign in as Admin</h3>
        </div>
        <form onSubmit={submitHandler}>
            <div className='flex flex-col mb-2'>
                <label htmlFor="email">Email</label>
                <input style={isError ? { border: '1px solid red' } : {}} value={email} className='border p-2 mt-2' onChange={(e) => {setEmail(e.target.value)}} type="text" />
            </div>
            <div className='flex flex-col'>
                <label htmlFor="password">Password</label>
                <div  className='border my-2 flex items-center'>
                <input className='p-2 w-full outline-none' onChange={(e) => {setPassword(e.target.value)}} type={visible} />
                 {visible === 'password' && (<EyeSlashIcon onClick={()=> setVisible('text')} className="h-6 w-6 text-gray-500 mr-1" />)}
                 {visible === 'text' && <EyeIcon onClick={()=> setVisible('password')} className="h-6 w-6 text-gray-500 mr-1" />}
                </div>
            </div>
           < button style={isLoading ? {opacity: '0.5'} : {}} className='flex gap-2 items-center justify-center p-2 bg-gray-900 text-white text-center mt-2 rounded-sm w-full'>
                {isLoading ? 'Registering' : 'Register '}
                {isLoading && (<TailSpin
                        height={25}
                        width={25}
                        color="#0b536d"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="oval-loading"
                        // secondaryColor="#0b536d"
                        strokeWidth={4}
                        // strokeWidthSecondary={4}
                    />)}
            </button>
            {error && (<div className=' text-center p-1 border text-red-600 border-red-600 bg-red-100 text-sm my-2'>{error.message}</div>)}
        </form>
       <div className="mt-3 text-sm">
       Already have an account? sign in <Link to={import.meta.env.PROD ? import.meta.env.VITE_CLIENT_BASE_URL : import.meta.env.VITE_DEV_CLIENT_BASE_URL + '/login'}>here</Link>
       </div>
    </div>
   </>
  )
}

export default SignIn
