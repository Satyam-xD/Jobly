import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Code, Palette, Database, Globe, Smartphone, Cpu } from 'lucide-react';

const categories = [
    { name: "Frontend Developer", icon: Code, color: "from-blue-500 to-cyan-500" },
    { name: "Backend Developer", icon: Database, color: "from-purple-500 to-pink-500" },
    { name: "Data Science", icon: Cpu, color: "from-green-500 to-emerald-500" },
    { name: "Graphic Designer", icon: Palette, color: "from-orange-500 to-red-500" },
    { name: "FullStack Developer", icon: Globe, color: "from-indigo-500 to-purple-500" },
    { name: "Mobile Developer", icon: Smartphone, color: "from-teal-500 to-blue-500" }
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='max-w-7xl mx-auto px-4 my-24'>
            {/* Header */}
            <div className='text-center mb-12'>
                <h2 className='text-4xl font-bold mb-4'>
                    Popular <span className='gradient-text'>Job Categories</span>
                </h2>
                <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
                    Explore trending job categories and find opportunities that match your skills and interests
                </p>
            </div>
            
            {/* Categories Grid */}
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8'>
                {categories.map((cat, index) => {
                    const IconComponent = cat.icon;
                    return (
                        <div
                            key={index}
                            onClick={() => searchJobHandler(cat.name)}
                            className='group cursor-pointer'
                        >
                            <div className={`w-full aspect-square bg-gradient-to-br ${cat.color} rounded-2xl p-4 flex flex-col items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
                                <IconComponent className='w-8 h-8 mb-3 group-hover:scale-110 transition-transform duration-300' />
                                <span className='text-sm font-medium text-center leading-tight'>{cat.name}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            {/* Browse All Button */}
            <div className='text-center'>
                <Button 
                    onClick={() => navigate('/browse')}
                    className='px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105'
                >
                    Browse All Categories
                </Button>
            </div>
        </div>
    )
}

export default CategoryCarousel