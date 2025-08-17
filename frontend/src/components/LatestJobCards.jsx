import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { Building2, MapPin, Clock, DollarSign } from 'lucide-react'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (
        <div 
            onClick={()=> navigate(`/description/${job._id}`)} 
            className='modern-card p-6 cursor-pointer group'
        >
            {/* Company Info */}
            <div className='flex items-start gap-3 mb-4'>
                <div className='w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0'>
                    <Building2 className='w-6 h-6 text-white' />
                </div>
                <div className='flex-1 min-w-0'>
                    <h3 className='font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors duration-300'>
                        {job?.company?.name}
                    </h3>
                    <div className='flex items-center gap-1 text-gray-500 text-sm'>
                        <MapPin className='w-4 h-4' />
                        <span>India</span>
                    </div>
                </div>
            </div>
            
            {/* Job Title & Description */}
            <div className='mb-4'>
                <h2 className='font-bold text-xl text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300'>
                    {job?.title}
                </h2>
                <p className='text-gray-600 text-sm leading-relaxed line-clamp-2'>
                    {job?.description}
                </p>
            </div>
            
            {/* Job Details */}
            <div className='space-y-3'>
                <div className='flex items-center gap-2 text-sm text-gray-500'>
                    <Clock className='w-4 h-4' />
                    <span>{job?.jobType}</span>
                </div>
                <div className='flex items-center gap-2 text-sm text-gray-500'>
                    <DollarSign className='w-4 h-4' />
                    <span>{job?.salary} LPA</span>
                </div>
            </div>
            
            {/* Badges */}
            <div className='flex items-center gap-2 mt-4 pt-4 border-t border-gray-100'>
                <Badge className='bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors duration-300'>
                    {job?.position} Positions
                </Badge>
                <Badge className='bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 transition-colors duration-300'>
                    {job?.jobType}
                </Badge>
                <Badge className='bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition-colors duration-300'>
                    {job?.salary}LPA
                </Badge>
            </div>
        </div>
    )
}

export default LatestJobCards