import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const categories = [
  {
    name: 'Raw Products',
    value: 'rawProducts',
  },
  {
    name: 'Processed Products',
    value: 'processedProducts',
  },
  {
    name: 'Food',
    value: 'food',
  },
];

function Filters({ showFilters, setShowFilters, filters, setFilters }) {
  return (
    <div className="w-72 flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="text-orange-900 text-xl">Filters</h1>
        <AiOutlineClose
          className="text-xl cursor-pointer"
          onClick={() => setShowFilters(!showFilters)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <h1 className="text-gray-600 mt-5">Categories</h1>

        <div className="flex flex-col gap-1">
          {categories.map((category) => {
            return (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="category"
                  className="max-width"
                  checked={filters.category.includes(category.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({
                        ...filters,
                        category: [...filters.category, category.value],
                      });
                    } else {
                      setFilters({
                        ...filters,
                        category: filters.category.filter(
                          (item) => item !== category.value
                        ),
                      });
                    }
                  }}
                />
                <label htmlFor="category">{category.name}</label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Filters;
