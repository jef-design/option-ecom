import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {EyeSlashIcon, EyeIcon} from "@heroicons/react/24/outline";
import {TailSpin} from "react-loader-spinner";
import {AxiosError} from "axios";
import axios from "axios";
import {useGoogleLogin} from "@react-oauth/google";

import axiosInstance from "../services/axiosInstance";
import Header from "../admin/layout/Header";

import useStore from "../services/useStore";
type ErrorResponse = AxiosError<any>;

type ErrorMessage = {
    message: string;
};
// interface TokenResponse {
//     access_token: string;
//     // Add other properties if your token response has them
// }

const UserSignUp = () => {
    // const [username, setUsername] = useState('')
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState("password");
    const [error, setError] = useState<ErrorMessage | null>(null);
    const {setUserCredentials} = useStore();
    const navigate = useNavigate();


    const signUpHandler = async (User: any) => {
        const response = await axiosInstance.post("/api/admin/signup", User);
        console.log(response);
        return response.data;
    };

    const {mutate, isError, isLoading} = useMutation({
        mutationFn: signUpHandler,
        mutationKey: ["signup"],
        onSuccess: (User) => {
            console.log(User);
            navigate("/user/auth/signup");
        },
        onError: (errorResponse: ErrorResponse) => {
            setError(errorResponse?.response?.data);
        },
    });
    const submitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const User = {name, email, password};
        mutate(User);
    };


    //google auth
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse: any) => {
            try {
                const response = await axios.get(
                    `https://www.googleapis.com/oauth2/v3/userinfo`,
                    {
                        headers: {
                            Authorization: `Bearer ${tokenResponse.access_token}`,
                            Accept: "application/json",
                        },
                    }
                )
                // setUserCredentials(response.data);
                const userAuth = {name: response.data?.name, email: response?.data?.email, picture: response?.data?.picture}
                mutateGoogle(userAuth)
                console.log(userAuth)
            } catch (error) {}
        },
    });


    const {mutate: mutateGoogle} = useMutation({
        mutationFn: (userAuth: {name: string; email: string}) =>
            axiosInstance.post("/api/admin/oauth/signup", userAuth).then((res) => res.data),
        onSuccess: (useresponse) => {
            console.log(useresponse);
            setUserCredentials(useresponse?.user)
            navigate("/");
        },
        onError: (errorResponse: ErrorResponse) => {
            navigate("/user/auth/signup");
            setError(errorResponse?.response?.data);
        },
    });
    return (
        <>
            <Header />
            <div className=' max-w-[458px] w-full mt-9 mx-auto border rounded-md p-5 bg-white'>
                <div>
                    <h3 className=' text-center font-bold text-lg'>Register to Option</h3>
                </div>
                <form onSubmit={submitHandler}>
                    <div className='flex flex-col mb-2'>
                        {/* <div className='flex flex-col mb-2'>
                <label htmlFor="username">Username</label>
                <input style={isError ? { border: '1px solid red' } : {}} value={username} className='border p-2 mt-2' onChange={(e) => {setUsername(e.target.value)}} type="text" />
            </div> */}
                        <label htmlFor='name'>Name</label>
                        <input
                            style={isError ? {border: "1px solid red"} : {}}
                            value={name}
                            className='border p-2 mt-2'
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            type='text'
                        />
                        {/* {isError &&(<span className=' text-xs text-red-600'>Field is required</span>)} */}
                    </div>
                    <div className='flex flex-col mb-2'>
                        <label htmlFor='email'>Email</label>
                        <input
                            style={isError ? {border: "1px solid red"} : {}}
                            value={email}
                            className='border p-2 mt-2'
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            type='text'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='password'>Password</label>
                        <div className='border my-2 flex items-center'>
                            <input
                                className='p-2 w-full outline-none'
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                type={visible}
                            />
                            {visible === "password" && (
                                <EyeSlashIcon
                                    onClick={() => setVisible("text")}
                                    className='h-6 w-6 text-gray-500 mr-1'
                                />
                            )}
                            {visible === "text" && (
                                <EyeIcon
                                    onClick={() => setVisible("password")}
                                    className='h-6 w-6 text-gray-500 mr-1'
                                />
                            )}
                        </div>
                    </div>
                    <button
                        style={isLoading ? {opacity: "0.5"} : {}}
                        className='flex gap-2 items-center justify-center p-2 bg-gray-900 text-white text-center mt-2 rounded-sm w-full'
                    >
                        {isLoading ? "Registering" : "Register "}
                        {isLoading && (
                            <TailSpin
                                height={25}
                                width={25}
                                color='#0b536d'
                                wrapperStyle={{}}
                                wrapperClass=''
                                visible={true}
                                ariaLabel='oval-loading'
                                // secondaryColor="#0b536d"
                                strokeWidth={4}
                                // strokeWidthSecondary={4}
                            />
                        )}
                    </button>
                    <div className='my-2'>
                    <button
                            className='bg-gray-900 w-full p-2 rounded-sm text-white flex items-center gap-2 justify-center'
                            type='button'
                            onClick={() => login()}
                        >
                            <img
                                className='h-6 w-6'
                                src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png'
                                alt=''
                            />
                            Sign up with Google
                        </button>
                        {/* <GoogleLogin
                        onSuccess={(credentialResponse: any) => {
                            const decoded: any = jwtDecode(credentialResponse?.credential)
                            const userAuth = {name: decoded.name, email: decoded.email}
                            mutateGoogle(userAuth)
                           
                        }}
                        onError={() => {
                            console.log("Login Failed");
                        }}
                    /> */}
                    </div>
                    {error && (
                        <div className=' text-center p-1 border text-red-600 border-red-600 bg-red-100 text-sm my-2'>
                            {error.message}
                        </div>
                    )}
                </form>
                <div className='mt-3 text-sm'>
                    Already have an account? sign in{" "}
                    <Link
                        to={
                            import.meta.env.PROD
                                ? import.meta.env.VITE_CLIENT_BASE_URL
                                : import.meta.env.VITE_DEV_CLIENT_BASE_URL + "/login"
                        }
                    >
                        here
                    </Link>
                </div>
            </div>
        </>
    );
};

export default UserSignUp;
