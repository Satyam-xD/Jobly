import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { LogOut, User2, ChevronDown } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <nav className='sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8'>
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className='flex items-center'
                >
                    <Link to="/" className='flex items-center gap-1'>
                        <h1 className='text-2xl font-bold bg-gradient-to-r from-[#F83002] to-[#6A38C2] bg-clip-text text-transparent'>
                            Jobly
                        </h1>
                    </Link>
                </motion.div>

                <div className='flex items-center gap-8'>
                    <ul className='hidden md:flex font-medium items-center gap-6'>
                        {user && user.role === 'recruiter' ? (
                            <>
                                <motion.li whileHover={{ scale: 1.05 }}>
                                    <Link to="/admin/companies" className='text-gray-600 hover:text-[#6A38C2] transition-colors'>Companies</Link>
                                </motion.li>
                                <motion.li whileHover={{ scale: 1.05 }}>
                                    <Link to="/admin/jobs" className='text-gray-600 hover:text-[#6A38C2] transition-colors'>Jobs</Link>
                                </motion.li>
                            </>
                        ) : (
                            <>
                                <motion.li whileHover={{ scale: 1.05 }}>
                                    <Link to="/" className='text-gray-600 hover:text-[#6A38C2] transition-colors'>Home</Link>
                                </motion.li>
                                <motion.li whileHover={{ scale: 1.05 }}>
                                    <Link to="/jobs" className='text-gray-600 hover:text-[#6A38C2] transition-colors'>Jobs</Link>
                                </motion.li>
                                <motion.li whileHover={{ scale: 1.05 }}>
                                    <Link to="/browse" className='text-gray-600 hover:text-[#6A38C2] transition-colors'>Browse</Link>
                                </motion.li>
                            </>
                        )}
                    </ul>

                    {!user ? (
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            className='flex items-center gap-3'
                        >
                            <Link to="/login">
                                <Button variant="outline" className='border-[#6A38C2] text-[#6A38C2] hover:bg-[#6A38C2]/10'>
                                    Login
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-gradient-to-r from-[#6A38C2] to-[#F83002] hover:from-[#5b30a6] hover:to-[#e02b02] text-white shadow-lg hover:shadow-[#6A38C2]/30">
                                    Signup
                                </Button>
                            </Link>
                        </motion.div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <motion.div 
                                    whileHover={{ scale: 1.05 }}
                                    className='flex items-center gap-2 cursor-pointer'
                                >
                                    <Avatar className="cursor-pointer h-9 w-9 ring-2 ring-[#6A38C2] ring-offset-2">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                        <AvatarFallback className="bg-gradient-to-r from-[#6A38C2] to-[#F83002] text-white">
                                            {user?.fullname?.charAt(0) || 'U'}
                                        </AvatarFallback>
                                    </Avatar>
                                    <ChevronDown className="h-4 w-4 text-gray-500" />
                                </motion.div>
                            </PopoverTrigger>
                            <PopoverContent className="w-72 p-4 rounded-xl shadow-xl border border-gray-100">
                                <div className='space-y-4'>
                                    <div className='flex gap-3 items-center'>
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                            <AvatarFallback className="bg-gradient-to-r from-[#6A38C2] to-[#F83002] text-white">
                                                {user?.fullname?.charAt(0) || 'U'}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h4 className='font-semibold text-gray-900'>{user?.fullname}</h4>
                                            <p className='text-sm text-gray-500'>{user?.profile?.bio || 'Welcome to Jobly!'}</p>
                                        </div>
                                    </div>
                                    <div className='space-y-2'>
                                        {user && user.role === 'student' && (
                                            <Link to="/profile">
                                                <Button variant="ghost" className="w-full justify-start gap-2 text-gray-700 hover:bg-gray-100">
                                                    <User2 className="h-4 w-4 text-[#6A38C2]" />
                                                    View Profile
                                                </Button>
                                            </Link>
                                        )}
                                        <Button 
                                            onClick={logoutHandler}
                                            variant="ghost" 
                                            className="w-full justify-start gap-2 text-gray-700 hover:bg-gray-100"
                                        >
                                            <LogOut className="h-4 w-4 text-[#F83002]" />
                                            Logout
                                        </Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar