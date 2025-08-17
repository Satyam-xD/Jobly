import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search, Sparkles, TrendingUp, Users } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='relative overflow-hidden'>
            {/* Background gradient */}
            <div className='absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'></div>
            
            {/* Floating elements */}
            <div className='absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-10 animate-pulse'></div>
            <div className='absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-10 animate-pulse delay-1000'></div>
            <div className='absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-10 animate-pulse delay-500'></div>
            
            <div className='relative text-center px-4 py-20'>
                <div className='flex flex-col gap-8 max-w-4xl mx-auto'>
                    {/* Badge */}
                    <div className='flex items-center justify-center gap-2 mx-auto px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-lg'>
                        <Sparkles className='w-4 h-4' />
                        <span>No. 1 Job Hunt Website</span>
                    </div>
                    
                    {/* Main heading */}
                    <div className='space-y-4'>
                        <h1 className='text-6xl md:text-7xl font-bold leading-tight'>
                            Search, Apply & <br /> 
                            Get Your <span className='gradient-text'>Dream Jobs</span>
                        </h1>
                        <p className='text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed'>
                            Discover thousands of job opportunities with all the information you need. 
                            Its your future, take a step and discover the amazing world around you.
                        </p>
                    </div>
                    
                    {/* Search bar */}
                    <div className='flex w-full max-w-2xl shadow-2xl border-0 pl-6 rounded-2xl items-center gap-4 mx-auto bg-white/90 backdrop-blur-sm'>
                        <input
                            type="text"
                            placeholder='Find your dream jobs...'
                            onChange={(e) => setQuery(e.target.value)}
                            className='outline-none border-none w-full py-4 text-lg placeholder-gray-400'
                        />
                        <Button 
                            onClick={searchJobHandler} 
                            className="rounded-r-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <Search className='h-6 w-6 mr-2' />
                            Search
                        </Button>
                    </div>
                    
                    {/* Stats */}
                    <div className='flex justify-center items-center gap-12 mt-12'>
                        <div className='text-center'>
                            <div className='flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mx-auto mb-2'>
                                <TrendingUp className='w-6 h-6 text-white' />
                            </div>
                            <p className='text-2xl font-bold text-gray-800'>10K+</p>
                            <p className='text-gray-600'>Active Jobs</p>
                        </div>
                        <div className='text-center'>
                            <div className='flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl mx-auto mb-2'>
                                <Users className='w-6 h-6 text-white' />
                            </div>
                            <p className='text-2xl font-bold text-gray-800'>500+</p>
                            <p className='text-gray-600'>Companies</p>
                        </div>
                        <div className='text-center'>
                            <div className='flex items-center justify-center w-12 h-12 bg-gradient-to-r from-pink-500 to-red-600 rounded-xl mx-auto mb-2'>
                                <Sparkles className='w-6 h-6 text-white' />
                            </div>
                            <p className='text-2xl font-bold text-gray-800'>50K+</p>
                            <p className='text-gray-600'>Happy Users</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection