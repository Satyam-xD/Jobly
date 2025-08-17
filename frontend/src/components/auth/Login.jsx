import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '../../utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '../../redux/authSlice'
import { Loader2, Mail, Lock, User, LogIn } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading,user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }
    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])
    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
            <Navbar />
            <div className='flex items-center justify-center min-h-[calc(100vh-5rem)] px-4'>
                <div className='w-full max-w-md'>
                    {/* Header */}
                    <div className='text-center mb-8'>
                        <div className='w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                            <LogIn className='w-8 h-8 text-white' />
                        </div>
                        <h1 className='text-3xl font-bold text-gray-800 mb-2'>Welcome Back</h1>
                        <p className='text-gray-600'>Sign in to your account to continue</p>
                    </div>
                    
                    {/* Form */}
                    <form onSubmit={submitHandler} className='bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20'>
                        <div className='space-y-6'>
                            {/* Email Field */}
                            <div>
                                <Label className='text-sm font-medium text-gray-700 mb-2 block'>Email Address</Label>
                                <div className='relative'>
                                    <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                                    <Input
                                        type="email"
                                        value={input.email}
                                        name="email"
                                        onChange={changeEventHandler}
                                        placeholder="Enter your email"
                                        className='pl-10 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300'
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <Label className='text-sm font-medium text-gray-700 mb-2 block'>Password</Label>
                                <div className='relative'>
                                    <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                                    <Input
                                        type="password"
                                        value={input.password}
                                        name="password"
                                        onChange={changeEventHandler}
                                        placeholder="Enter your password"
                                        className='pl-10 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300'
                                    />
                                </div>
                            </div>

                            {/* Role Selection */}
                            <div>
                                <Label className='text-sm font-medium text-gray-700 mb-3 block'>I am a</Label>
                                <div className='grid grid-cols-2 gap-3'>
                                    <label className='flex items-center p-3 rounded-xl border-2 border-gray-200 hover:border-blue-300 cursor-pointer transition-all duration-300'>
                                        <input
                                            type="radio"
                                            name="role"
                                            value="student"
                                            checked={input.role === 'student'}
                                            onChange={changeEventHandler}
                                            className='mr-3 text-blue-600 focus:ring-blue-500'
                                        />
                                        <div className='flex items-center gap-2'>
                                            <User className='w-4 h-4 text-gray-600' />
                                            <span className='text-sm font-medium'>Student</span>
                                        </div>
                                    </label>
                                    <label className='flex items-center p-3 rounded-xl border-2 border-gray-200 hover:border-blue-300 cursor-pointer transition-all duration-300'>
                                        <input
                                            type="radio"
                                            name="role"
                                            value="recruiter"
                                            checked={input.role === 'recruiter'}
                                            onChange={changeEventHandler}
                                            className='mr-3 text-blue-600 focus:ring-blue-500'
                                        />
                                        <div className='flex items-center gap-2'>
                                            <User className='w-4 h-4 text-gray-600' />
                                            <span className='text-sm font-medium'>Recruiter</span>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <Button 
                                type="submit" 
                                disabled={loading}
                                className='w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed'
                            >
                                {loading ? (
                                    <div className='flex items-center gap-2'>
                                        <Loader2 className='w-5 h-5 animate-spin' />
                                        Signing in...
                                    </div>
                                ) : (
                                    'Sign In'
                                )}
                            </Button>
                        </div>

                        {/* Sign Up Link */}
                        <div className='text-center mt-6'>
                            <p className='text-gray-600'>
                                Don't have an account?{' '}
                                <Link to="/signup" className='text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300'>
                                    Sign up here
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login