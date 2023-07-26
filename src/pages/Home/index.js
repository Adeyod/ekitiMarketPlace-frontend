import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SetLoader } from '../../redux/loadersSlice';
import { GetProducts } from '../../apicalls/products';
import { Input, message } from 'antd';
import Divider from '../../components/Divider';
import { useNavigate } from 'react-router-dom';
import Filters from './Filters';

import { IoFilterSharp } from 'react-icons/io5';
import moment from 'moment';

function Home() {
  const [showFilters, setShowFilters] = React.useState(true);
  const [products, setProducts] = React.useState([]);
  const [filters, setFilters] = React.useState({
    status: 'approved',
    category: [],
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProducts(filters);
      dispatch(SetLoader(false));
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [filters]);

  return (
    <div className="flex gap-5 px-3 mt-3">
      {showFilters && (
        <Filters
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          filters={filters}
          setFilters={setFilters}
        />
      )}
      <div className="flex flex-col gap-5 w-auto md:w-full flex-wrap">
        <div className="flex gap-5 mb-4 items-center">
          {!showFilters && (
            <IoFilterSharp
              onClick={() => setShowFilters(!showFilters)}
              className="text-4xl cursor-pointer"
            />
          )}
          <Input
            type="text"
            placeholder="Search Products here..."
            className="border border-gray-300 rounded border-solid w-full p-2 h-14"
          />
        </div>
        <div className="flex w-auto gap-5 flex-wrap">
          {products?.map((product) => {
            return (
              <div
                className=" border w-36 md:w-[25vw] lg:w-[20vw] items-center justify-center mx-auto flex-wrap border-gray-300 border-solid rounded  cursor-pointer "
                key={product._id}
                onClick={() => navigate(`/product/${product._id}`)}
              >
                <img
                  src={product.images[0]}
                  alt=""
                  className="w-full h-28 object-contain"
                />

                <div className="px-2 flex flex-col">
                  <h2 className="text-lg font-semibold italic">
                    {product.name}
                  </h2>

                  {product.age >= 1 && (
                    <h2 className="text-sm italic">
                      {product.age}
                      {product.age === 1 ? 'Year Old' : 'Years old'}
                    </h2>
                  )}

                  <Divider />
                  <span className="text-xl text-green-600 font-semibold">
                    ₦ {product.price}
                  </span>
                  <h2 className="text-lg font-semibold italic">
                    {product.seller.name}
                  </h2>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
