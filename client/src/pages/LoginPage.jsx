import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../helpers/axiosInstance";
import { useNavigate, NavLink } from "react-router"
import Swal from "sweetalert2"

function LoginPage() {
    const navigate = useNavigate()

    async function handleCredentialResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);
        try {
            const result = await axiosInstance({
                method: "POST",
                url: "/google-login",
                data: {
                    googleToken: response.credential
                }
            })
            const responseBody = result.data

            // save tokennya ke localStorage
            localStorage.setItem("access_token", responseBody.access_token)
            localStorage.setItem("user_id", responseBody.data.id)

            // pindah halaman
            navigate('/')
        } catch (error) {
            if (error.response && error.response.data) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.message,
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Terjadi kesalahan. Silakan coba lagi.',
                })
            }
        }
    }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onClick = async () => {
        try {
            const result = await axiosInstance({
                method: "POST",
                url: "/login",
                data: {
                    email: email,
                    password: password
                }
            })
            const response = result.data

            // save tokennya ke localStorage
            localStorage.setItem("access_token", response.access_token)
            localStorage.setItem("user_id", response.data.id)

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Login Berhasil'
            })

            // pindah halaman
            navigate('/')

        } catch (error) {
            if (error.response && error.response.data) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.message,
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Terjadi kesalahan. Silakan coba lagi.',
                })
            }
        }
    }

    useEffect(() => {
        if (localStorage.getItem("access_token")) {
            navigate('/')
        }

        google.accounts.id.initialize({
            client_id: process.env.GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse
        });
        google.accounts.id.renderButton(
            document.getElementById("btnGoogleLogin"),
            { theme: "outline", size: "large" }  // customization attributes
        );
    }, [])

    const dispatch = useDispatch() // <-- untuk invoke function pengubah

    const counter = useSelector((state) => state.counter)
    return (
        <>
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">

                <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <div className="grid grid-cols-3 justify-center items-center">

                            <svg onClick={() => {
                                navigate('/landing')
                            }}
                                className="w-6 h-6 mr-1 cursor-pointer"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                />
                            </svg>
                            <h2 className="text-center text-3xl font-bold text-gray-800">
                                LOGIN
                            </h2>
                            <div></div>

                        </div>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            onClick()
                        }} className="space-y-6 mt-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={(e) => setPassword(e.target.value)}
                                        type="password"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Sign in
                            </button>
                        </form>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>

                            {/* login with google */}
                            <div className="mt-6 flex flex-col">
                                {/* <button
                                    type="button"
                                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    <span className="sr-only">Sign in with Google</span>
                                    Google
                                </button> */}
                                <div className="text-center flex justify-center" id="btnGoogleLogin">Loading...</div>

                            </div>
                        </div>

                        <p className="mt-6 text-center text-sm text-gray-600">
                            Belum memiliki akun?
                            <NavLink to="/register" className="text-blue-600 hover:text-blue-500">
                                {" "}Daftar Sekarang</NavLink>

                        </p>
                    </div>
                </div>
            </div>

        </>
    );
}

export default LoginPage;