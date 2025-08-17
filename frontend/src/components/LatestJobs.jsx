import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 
import { useNavigate } from 'react-router-dom';
import { Briefcase, TrendingUp, Zap } from 'lucide-react';

const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job);
    const {user} = useSelector(store=>store.auth);
    const navigate = useNavigate();
   
    return (
        <div className='max-w-7xl mx-auto my-24 px-4'>
            {/* Header Section */}
            <div className='text-center mb-16'>
                <div className='flex items-center justify-center gap-3 mb-6'>
                    <div className='w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center'>
                        <TrendingUp className='w-6 h-6 text-white' />
                    </div>
                    <h1 className='text-5xl font-bold'>
                        Latest & Top <span className='gradient-text'>Job Openings</span>
                    </h1>
                </div>
                <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
                    Discover the most recent opportunities from top companies. 
                    Find your next career move with our curated job listings.
                </p>
            </div>
            
            {/* Jobs Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {!user ? (
                    <div className="col-span-full text-center py-16">
                        <div className='max-w-md mx-auto'>
                            <div className='w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                                <Briefcase className='w-10 h-10 text-blue-600' />
                            </div>
                            <h3 className='text-2xl font-semibold text-gray-800 mb-3'>Sign in to view jobs</h3>
                            <p className="text-gray-600 mb-6">Create an account or sign in to explore thousands of job opportunities</p>
                            <button 
                                onClick={() => navigate('/login')}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            >
                                Sign In
                            </button>
                        </div>
                    </div>
                ) : allJobs.length <= 0 ? (
                    <div className="col-span-full text-center py-16">
                        <div className='w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6'>
                            <Zap className='w-10 h-10 text-gray-400' />
                        </div>
                        <h3 className='text-2xl font-semibold text-gray-600 mb-2'>No Jobs Available</h3>
                        <p className='text-gray-500'>Check back later for new opportunities</p>
                    </div>
                ) : (
                    allJobs?.slice(0,6).map((job) => <LatestJobCards key={job._id} job={job}/>)
                )}
            </div>
            
            {/* View All Button */}
            {user && allJobs.length > 0 && (
                <div className='text-center mt-12'>
                    <button 
                        onClick={() => navigate('/browse')}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                        View All Jobs
                    </button>
                </div>
            )}
        </div>
    )
}

export default LatestJobs