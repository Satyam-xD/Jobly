import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useNavigate } from 'react-router-dom';

// const randomJobs = [1, 2,45];

const Browse = () => {
    useGetAllJobs();
    const {allJobs} = useSelector(store=>store.job);
    const {user} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""));
        }
    },[])
    
    if (!user) {
        return (
            <div>
                <Navbar />
                <div className='max-w-7xl mx-auto my-10 text-center py-20'>
                    <h1 className='text-2xl font-bold mb-4'>Authentication Required</h1>
                    <p className='text-gray-600 mb-6'>Please sign in to browse and search for jobs</p>
                    <button 
                        onClick={() => navigate('/login')}
                        className="bg-[#6A38C2] text-white px-6 py-2 rounded-lg hover:bg-[#5a2db8] transition-colors"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        );
    }
    
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'>Search Results ({allJobs.length})</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {allJobs.length === 0 ? (
                        <div className="col-span-3 text-center py-10">
                            <p className="text-gray-600">No jobs found matching your search criteria</p>
                        </div>
                    ) : (
                        allJobs.map((job) => {
                            return (
                                <Job key={job._id} job={job}/>
                            )
                        })
                    )}
                </div>
            </div>
        </div>
    )
}

export default Browse