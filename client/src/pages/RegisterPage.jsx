import { useEffect, useState } from "react";
import Swal from "sweetalert2"
import axiosInstance from "../helpers/axiosInstance"
import { useNavigate, NavLink } from "react-router"

function RegisterPage() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')

    useEffect(() => {
        if (localStorage.getItem("access_token")) {
            navigate('/')
        }
    }, [])

    const onClick = async () => {
        try {
            const result = await axiosInstance({
                method: "POST",
                url: "/register",
                data: {
                    email: email,
                    password: password,
                    address: address,
                    phone: phone
                }
            })
            const response = result.data
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Berhasil membuat akun'
            })

            // pindah halaman
            navigate('/login')

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
                    text: `Terjadi kesalahan. Silakan coba lagi ${error}`,
                })
            }
        }
    }

    return (
        <>
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">

                <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <div className="grid grid-cols-3 justify-center items-center">

                            <svg
                                onClick={() => {
                                    navigate('/login')
                                }}
                                cursor="pointer"
                                className="w-6 h-6 mr-1"
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
                                REGISTER
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
                                        type="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Alamat
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Nomor Handphone
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Register
                            </button>
                        </form>

                        <p className="mt-6 text-center text-sm text-gray-600">
                            Sudah memiliki akun?{' '}
                            <NavLink to="/login" className="text-blue-600 hover:text-blue-500">
                                {" "}Login Sekarang</NavLink>
                        </p>
                    </div>
                </div>
            </div>

        </>
    );
}

export default RegisterPage