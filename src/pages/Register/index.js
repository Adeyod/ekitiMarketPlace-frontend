import { Button, Form, Input, message } from 'antd';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Divider from '../../components/Divider';
import { RegisterUser } from '../../apicalls/users';
import { useDispatch } from 'react-redux';
import { SetLoader } from '../../redux/loadersSlice';

const validation = [
  {
    required: true,
    message: 'All fields are required',
  },
];

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      const response = await RegisterUser(values);

      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        navigate('/login');
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  });

  return (
    <div className="h-screen bg-orange-600 flex justify-center items-center">
      <div className="bg-white p-5 m-4 rounded w-[450px]">
        <div className="text-center underline">
          <h3 className="italic text-primary mb-2">EKITI MARKET PLACE</h3>
          <h4>REGISTER HERE</h4>
        </div>
        <Divider />
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name" rules={validation}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={validation}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={validation}>
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="mx-auto">
            Register
          </Button>
          <div className="text-center">
            <span className="font-bold">
              Already have an account?
              <Link to="/login" className="ml-2 ">
                Login
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
