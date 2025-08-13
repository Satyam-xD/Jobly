import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Button } from './ui/button';

const filterData = [
  {
    filterType: "Location",
    options: ["Delhi", "Bangalore", "Lucknow", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    options: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary",
    options: ["0-40k", "42k-1lakh", "1lakh to 5lakh"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const handleApplyFilter = () => {
    if (selectedValue) {
      dispatch(setSearchedQuery(selectedValue));
    }
  };

  const handleClearFilter = () => {
    setSelectedValue('');
    dispatch(setSearchedQuery(''));
  };

  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3' />
      <RadioGroup value={selectedValue} onValueChange={setSelectedValue}>
        {filterData.map((data, index) => (
          <div key={`filter-${index}`}>
            <h1 className='font-bold text-lg'>{data.filterType}</h1>
            {data.options.map((option, idx) => (
              <div key={`option-${idx}`} className='flex items-center space-x-2 my-2'>
                <RadioGroupItem value={option} id={`${data.filterType}-${option}`} />
                <Label htmlFor={`${data.filterType}-${option}`}>{option}</Label>
              </div>
            ))}
          </div>
        ))}
      </RadioGroup>
      <div className="flex gap-2 mt-4">
        <Button
          onClick={handleApplyFilter}
          disabled={!selectedValue}
          className="flex-1"
        >
          Apply Filter
        </Button>
        <Button
          onClick={handleClearFilter}
          variant="outline"
          className="flex-1"
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

export default FilterCard;